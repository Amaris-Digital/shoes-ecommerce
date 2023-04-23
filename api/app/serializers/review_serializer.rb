class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :content, :score
  belongs_to :product
end
