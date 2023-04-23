import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ProductDetail({ loggedInUserId }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch(`http://127.0.0.1:3000/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  function addReview(e) {
    e.preventDefault();
    fetch("http://127.0.0.1:3000/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
        score,
        product_id: Number(id),
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);

        setContent("");
        setScore(0);

        setTimeout(() => {
          setShowReviewModal(false);
        }, 2000);
      });
  }

  function addOrder(e) {
    e.preventDefault();
    fetch("http://127.0.0.1:3000/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location,
        phone_number,
        user_id: Number(loggedInUserId),
        product_id: Number(id),
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);

        setContent("");
        setScore(0);

        setTimeout(() => {
          setShowOrderModal(false);
        }, 2000);
      });
  }

  return (
    <div className="flex flex-wrap justify-center py-8 max-w-[1240px] mx-auto ">
      {showReviewModal && (
        <div className="fixed kulim-park bg-white shadow-xl h-[600px] my-auto w-[350px] inset-0 bg-opacity z-10 flex flex-col items-center justify-center w-[400px]  mx-auto">
          <div className="flex justify-end w-full p-4">
            <button
              className="bg-black text-white px-4 py-2 rounded-lg"
              onClick={() => setShowReviewModal(false)}
            >
              X
            </button>
          </div>
          <form className="space-y-4 md:space-y-6" onSubmit={addReview}>
            <p>
              <span className="text-2xl font-bold">Add a review</span>
            </p>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Content
              </label>
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="bg-white border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[250px] p-2.5 "
                placeholder="Good, average"
                required=""
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Score (1-5)
              </label>
              <input
                type="number"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                className="bg-white border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[250px] p-2.5 "
                required=""
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-black border border-transparent rounded-lg py-2.5 px-4  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600"
            >
              Add Review
            </button>
          </form>
        </div>
      )}

      {showOrderModal && (
        <div className="fixed kulim-park bg-white shadow-xl h-[600px] my-auto w-[350px] inset-0 bg-opacity z-10 flex flex-col items-center justify-center w-[400px]  mx-auto">
          <div className="flex justify-end w-full p-4">
            <button
              className="bg-black text-white px-4 py-2 rounded-lg"
              onClick={() => setShowOrderModal(false)}
            >
              X
            </button>
          </div>
          <form className="space-y-4 md:space-y-6" onSubmit={addOrder}>
            <p>
              <span className="text-2xl font-bold">Order Details</span>
            </p>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-white border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[250px] p-2.5 "
                placeholder="juja"
                required=""
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Phone Number
              </label>
              <input
                type="text"
                value={phone_number}
                placeholder="0712345678"
                onChange={(e) => setPhone_number(e.target.value)}
                className="bg-white border border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[250px] p-2.5 "
                required=""
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-black border border-transparent rounded-lg py-2.5 px-4  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600"
            >
              Add Review
            </button>
          </form>
        </div>
      )}
      <div className="w-full sm:w-1/2 lg:w-1/3 p-4 flex">
        <div className=" p-4 flex-1 flex flex-col ">
          <div className="bg-white rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.description}
              className="w-full mb-4"
              style={{ transform: "rotate(-30deg)" }}
            />
          </div>
          <h2 className="text-lg font-semibold mb-2 text-[#f2f3f4] text-center mt-10">
            {product.description}
          </h2>
          <div className="flex justify-center mt-auto ">
            <p className="text-gray-600">${product.price}</p>
          </div>
          <div className="flex justify-center gap-4 mt-auto">
            <button
              className="bg-white  rounded-xl px-2 py-4"
              onClick={() => setShowReviewModal(true)}
            >
              Add Review
            </button>
            <button
              className="bg-white rounded-xl px-2 py-4"
              onClick={() => setShowOrderModal(true)}
            >
              Order Now
            </button>
          </div>

          <h1 className="text-white">reviews</h1>

          {product.reviews.map((review) => (
            <div className="text-white">
              <h1>{review.content}</h1>

              {[...Array(review.score)].map((star) => (
                <span className="star">&#9733;</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
