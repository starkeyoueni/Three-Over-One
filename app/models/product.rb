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

      Product.create(
        :title        => product.title,
        :body_html    => product.body_html,
        :variants     => variants,
        :images       => images,
        :handle       => product.handle,
        :product_type => product.product_type,
        :tags         => self.tags_from_string(product.tags)
      )
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




#       "body_html": "<p>It's the small iPod with one very big idea: Video. Now the world's most popular music player, available in 4GB and 8GB models, lets you enjoy TV shows, movies, video podcasts, and more. The larger, brighter display means amazing picture quality. In six eye-catching colors, iPod nano is stunning all around. And with models starting at just $149, little speaks volumes.</p>",
#       "created_at": "2012-05-04T11:20:02-04:00",
#       "handle": "ipod-nano",
#       "id": 632910392,
#       "product_type": "Cult Products",
#       "published_at": "2007-12-31T19:00:00-05:00",
#       "template_suffix": null,
#       "title": "IPod Nano - 8GB",
#       "updated_at": "2012-05-04T11:20:02-04:00",
#       "vendor": "Apple",
#       "tags": "Emotive, Flash Memory, MP3, Music",
#       "variants": [
#         {
#           "compare_at_price": null,
#           "created_at": "2012-05-04T11:20:02-04:00",
#           "fulfillment_service": "manual",
#           "grams": 200,
#           "id": 808950810,
#           "inventory_management": "shopify",
#           "inventory_policy": "continue",
#           "option1": "Pink",
#           "option2": null,
#           "option3": null,
#           "position": 1,
#           "price": "199.00",
#           "requires_shipping": true,
#           "sku": "IPOD2008PINK",
#           "taxable": true,
#           "title": "Pink",
#           "updated_at": "2012-05-04T11:20:02-04:00",
#           "inventory_quantity": 10
#         },
#         {
#           "compare_at_price": null,
#           "created_at": "2012-05-04T11:20:02-04:00",
#           "fulfillment_service": "manual",
#           "grams": 200,
#           "id": 49148385,
#           "inventory_management": "shopify",
#           "inventory_policy": "continue",
#           "option1": "Red",
#           "option2": null,
#           "option3": null,
#           "position": 2,
#           "price": "199.00",
#           "requires_shipping": true,
#           "sku": "IPOD2008RED",
#           "taxable": true,
#           "title": "Red",
#           "updated_at": "2012-05-04T11:20:02-04:00",
#           "inventory_quantity": 20
#         },
#         {
#           "compare_at_price": null,
#           "created_at": "2012-05-04T11:20:02-04:00",
#           "fulfillment_service": "manual",
#           "grams": 200,
#           "id": 39072856,
#           "inventory_management": "shopify",
#           "inventory_policy": "continue",
#           "option1": "Green",
#           "option2": null,
#           "option3": null,
#           "position": 3,
#           "price": "199.00",
#           "requires_shipping": true,
#           "sku": "IPOD2008GREEN",
#           "taxable": true,
#           "title": "Green",
#           "updated_at": "2012-05-04T11:20:02-04:00",
#           "inventory_quantity": 30
#         },
#         {
#           "compare_at_price": null,
#           "created_at": "2012-05-04T11:20:02-04:00",
#           "fulfillment_service": "manual",
#           "grams": 200,
#           "id": 457924702,
#           "inventory_management": "shopify",
#           "inventory_policy": "continue",
#           "option1": "Black",
#           "option2": null,
#           "option3": null,
#           "position": 4,
#           "price": "199.00",
#           "requires_shipping": true,
#           "sku": "IPOD2008BLACK",
#           "taxable": true,
#           "title": "Black",
#           "updated_at": "2012-05-04T11:20:02-04:00",
#           "inventory_quantity": 40
#         }
#       ],
#       "images": [
#         {
#           "created_at": "2012-05-04T11:20:02-04:00",
#           "id": 850703190,
#           "position": 1,
#           "product_id": 632910392,
#           "updated_at": "2012-05-04T11:20:02-04:00",
#           "src": "http://static.shopify.com/s/files/1/6909/3384/products/ipod-nano.png?0"
#         }
#       ],
#       "options": [
#         {
#           "name": "Title"
#         }
#       ]
#     }
#   ]
# }

