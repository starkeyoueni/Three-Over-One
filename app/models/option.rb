class Option
  include Mongoid::Document
  field :name,          :type => String

  def serialize(object)
    {
      "name"   => object.name
    }
  end

  def self.from_shopify(shopify_option)
    option = Option.new
    option.name =  shopify_option.name
    option
  end
end
