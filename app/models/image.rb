class Image
  include Mongoid::Document
  field :created_at,  :type => DateTime
  field :updated_at,  :type => DateTime
  field :id,          :type => String
  field :position,    :type => Integer
  field :src,         :type => String
  field :thumb,       :type => String

  def self.from_shopify(object)
    image = Image.new
    image.created_at = object.created_at
    image.id         = object.id
    image.position   = object.position
    image.updated_at = object.updated_at
    image.src        = object.src
    image.thumb      = object.large
    image
  end

  def serialize(object)
    {
      "created_at"  => object.created_at,
      "id"          => object.id,
      "position"    => object.position,
      "updated_at"  => object.updated_at,
      "thumb"       => object.large,
      "src"         => object.src
    }
  end
end
