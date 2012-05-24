class Variant
  include Mongoid::Document
  field :created_at,    :type => DateTime
  field :updated_at,    :type => DateTime
  field :position,      :type => Integer
  field :sku,           :type => String
  field :price,         :type => BigDecimal
  field :option1,       :type => String
  field :option2,       :type => String
  field :option3,       :type => String

  def serialize(object)
    {
      "created_at"  => object.created_at,
      "updated_at"  => object.updated_at,
      "id"          => object.id,
      "position"    => object.position,
      "sku"         => object.sku,
      "price"       => object.price,
      "sku"         => object.sku,
      "option1"     => object.option1,
      "option2"     => object.option2,
      "option3"     => object.option3
    }
  end

  def self.from_shopify(shopify_variant)
    variant = Variant.new
    variant.created_at =  shopify_variant.created_at
    variant.updated_at =  shopify_variant.updated_at
    variant.id         =  shopify_variant.id
    variant.position   =  shopify_variant.position
    variant.sku        =  shopify_variant.sku
    variant.price      =  shopify_variant.price
    variant.sku        =  shopify_variant.sku
    variant.option1    =  shopify_variant.option1
    variant.option2    =  shopify_variant.option2
    variant.option3    =  shopify_variant.option3
    variant
  end
end

# {
#   "compare_at_price": null,
#   "created_at": "2012-05-04T11:20:02-04:00",
#   "fulfillment_service": "manual",
#   "grams": 200,
#   "id": 808950810,
#   "inventory_management": "shopify",
#   "inventory_policy": "continue",
#   "option1": "Pink",
#   "option2": null,
#   "option3": null,
#   "position": 1,
#   "price": "199.00",
#   "requires_shipping": true,
#   "sku": "IPOD2008PINK",
#   "taxable": true,
#   "title": "Pink",
#   "updated_at": "2012-05-04T11:20:02-04:00",
#   "inventory_quantity": 10
# },
