class ReviewsController < ApplicationController
    skip_before_action :authorized, only: [:create]


    def create
        review = Review.create(review_params)
        render json: review
    end


    private

    def review_params
        params.require(:review).permit(:content, :score, :product_id)
    end
    

end
