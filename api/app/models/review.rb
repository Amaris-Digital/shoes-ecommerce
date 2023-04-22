class Review < ApplicationRecord
  belongs_to :product
  validates :content, :score, presence: true
end
