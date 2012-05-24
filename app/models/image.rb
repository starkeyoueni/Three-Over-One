class Image
  include Mongoid::Document
  field :created_at,  :type => DateTime
  field :updated_at,  :type => DateTime
  field :id,          :type => String
  field :position,    :type => Integer
  field :src,         :type => String
  field :thumb,       :type => String
  field :small,       :type => String
  field :large,       :type => String

  def self.from_shopify(object)
    image = Image.new
    image.created_at = object.created_at
    image.id         = object.id
    image.position   = object.position
    image.updated_at = object.updated_at
    image.src        = object.src
    image.small      = object.small
    image.large      = object.large
    image.thumb      = object.thumb
    image
  end

  def serialize(object)
    {
      "created_at"  => object.created_at,
      "id"          => object.id,
      "position"    => object.position,
      "updated_at"  => object.updated_at,
      "src"         => object.src,
      "thumb"       => object.thumb,
      "small"       => object.small,
      "large"       => object.large
    }
  end
end
