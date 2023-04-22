class ProductsController < ApplicationController
    skip_before_action :authorized
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

    def index
        @products = Product.all
        render json: @products 
    end


    def show
        @product = Product.find(params[:id])
        render json: @product
    end

    def create
        @product = Product.new(product_params)
        if @product.save
            render json: @product
        else
            render json: @product.errors, status: :unprocessable_entity
        end
    end

    def update

        @product = Product.find(params[:id])
        if @product.update(product_params)
            render json: @product
        else
            render json: @product.errors, status: :unprocessable_entity
        end
    end

    def destroy
        @product = Product.find(params[:id])
        @product.destroy
    end

    private
        def find_record(id)
             Product.find(id)
          rescue ActiveRecord::RecordNotFound
            raise ApiError.new("Record not found")
        end

        def record_not_found
            render json: { error: "Record not found" }, status: :not_found
        end

        def product_params
            params.require(:product).permit(:name, :description, :price, :image)
        end



end
