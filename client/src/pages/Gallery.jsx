import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Thumbnail from "../components/Thumbnail";
import { ThreeDots } from "react-loader-spinner";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("https://photomanagementapp.onrender.com/photos");
        const data = await response.json();
        setImages(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
  <div className="">
      {loading ? (
        <div className="w-full flex flex-col items-center justify-center min-h-dvh h-max  ">
          <p className="text-xl">Loading</p>
          <div>
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        </div>
      ) : (
        <div className=" min-h-dvh h-max">
          <h2 className="text-center mt-10 text-2xl md:text-3xl ">Gallery</h2>
          <div className="image-container md:m-10 grid md:grid-cols-3  w-full m-5">
            {images.map((image) => (
             
              <div key={image._id} className="container mb-5 md:mb-10 scale">
                <Link to={`/photos/${image._id}`} className="h-64 w-64">
                  <Thumbnail image={image} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
     </div>
  );
};

export default Gallery;
