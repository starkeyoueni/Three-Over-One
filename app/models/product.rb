class Product
  include Mongoid::Document
  field :title,         :type => String
  field :body_html,     :type => String
  embeds_many :images
  embeds_many :variants
  embeds_many :options
  field :handle,        :type => String
  field :product_type,  :type => String
  field :tags,          :type => Array
  field :sizes,         :type => Array
  field :colours,       :type => Array
    
  def self.import_from_shopify
    Product.delete_all
    products = ShopifyAPI::Product.all
    
    products.each do |product|
      variants = product.variants.collect do |variant|
        Variant.from_shopify(variant)
      end

      images = product.images.collect do |image|
        Image.from_shopify(image)
      end

      options = product.options.collect do |option|
        Option.from_shopify(option)
      end
      
      product = Product.create(
        :title        => product.title,
        :body_html    => product.body_html,
        :variants     => variants,
        :images       => images,
        :options      => options,
        :handle       => product.handle,
        :product_type => product.product_type,
        :tags         => self.tags_from_string(product.tags)
      )
      
      product.extract_size_colours
      product.save!
    end
  end
  
  def extract_size_colours
    self.colours = []
    self.sizes = []
    variants.each do |variant|
      self.colours << variant.option1 unless self.colours.include? variant.option1
      self.sizes << variant.option2   unless self.sizes.include? variant.option2
    end
  end
  
  def self.tags_from_string(obj)
    if obj.is_a? String
      obj.split(',').collect {|tag| tag.strip}
    elsif obj.is_a? Array
      obj
    end
  end
  
end
