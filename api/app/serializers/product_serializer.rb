class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :image, :price
  validates :name, presence: true
  validates :description, presence: true
  validates :image, presence: true
  validates :price, presence: true
  has_many :reviews
end
