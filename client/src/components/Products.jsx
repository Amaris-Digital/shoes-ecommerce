import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ProductCard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await axios.get("http://127.0.0.1:3000/products");
      setProducts(response.data);
    }
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-wrap justify-center py-8 max-w-[1240px] mx-auto">
      {products.map((product) => (
        <div
          key={product.id}
          className="w-full sm:w-1/2 lg:w-1/3 p-4 flex hover:scale-105 transition-all duration-500 cursor-pointer"
        >
          <Link
            to={`/product/${product.id}`}
            className=" p-4 flex-1 flex flex-col "
          >
            <div className="bg-white rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.description}
                className="w-full mb-4"
                style={{ transform: "rotate(-30deg)", height: "100%" }}
              />
            </div>
            <h2 className="text-lg font-semibold mb-2 text-[#f2f3f4] text-center mt-10">
              {product.description}
            </h2>
            <div className="flex justify-center mt-auto ">
              <p className="text-gray-600">${product.price}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ProductCard;
