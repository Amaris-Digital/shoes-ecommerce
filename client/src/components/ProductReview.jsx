import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
import "swiper/swiper.min.css";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper/core";
SwiperCore.use([Navigation, Pagination, Autoplay]);
import { FaStar } from 'react-icons/fa';



const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [swiperReviews, setSwiperReviews] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const fetchReviews = async () => {
    const response = await axios.get(
      `http://127.0.0.1:3000/products`
    );
    setReviews(response.data);

    setSwiperReviews(response.data.slice(0, 9));
  };

  useEffect(() => {
    fetchReviews();
  }, [pageNumber]);

  const Pagination = ({ pageNumber, setPageNumber }) => {
    const handlePrevPage = () => {
      setPageNumber(pageNumber - 1);
    };

    const handleNextPage = () => {
      setPageNumber(pageNumber + 1);
    };
  };

  const renderStars = (score) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`inline-block text-yellow-500 ${
            i < score ? 'fill-current' : 'fill-gray-300'
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="container mx-auto mt-8">
    <h1 className="text-3xl font-bold mb-4 text-white text-center py-5">Product <span className="text-orange-400">Reviews</span></h1>

      <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} />
      <Swiper
        className="mt-8"
        slidesPerView={4}
        spaceBetween={20}
        navigation={false}
        loop={true}
        autoplay={{ delay: 7500, disableOnInteraction: false }}
      >
        {reviews.map((product) =>
            product.reviews.map((review) => (
                <SwiperSlide key={review.id} className="border rounded-lg overflow-hidden shadow-lg max-w-xs mb-10">
                <div className="flex items-center bg-gray-200 rounded-t-lg p-2">
          <img
            className="w-16 h-16 rounded-full object-cover mr-4 bg-[#fff]"
            src={product.image}
            alt={product.name}
            style={{ transform: "rotate(-30deg)", height: "100%" }}
          />
          <div className="flex flex-col">
            <h3 className="text-lg font-bold">{product.name}</h3>
          </div>
        </div>
        <div className="p-4 bg-gray-200">
  <div className="flex justify-center mb-2">{renderStars(review.score)}</div>
  <p className="text-gray-700 text-center">{review.content}</p>
</div>


          </SwiperSlide>
        ))
        )}
      </Swiper>
    </div>
  );
};

export default Review;
