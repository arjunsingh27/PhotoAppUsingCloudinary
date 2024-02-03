import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ImageDetailCard from "../components/ImageDetailCard";
import { ThreeDots } from "react-loader-spinner";

const PhotoDetail = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPhoto = async () => {
    try {
      const response = await fetch(`http://localhost:3000/photos/${id}`);
      console.log('Response status:', response.status);

      const data = await response.json();
      console.log('Data received:', data);

      setPhoto(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching photo details:", error);
    }
  };

  useEffect(() => {
    fetchPhoto();
  }, [id]); // Include 'id' in the dependency array

  return (
    <>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-screen">
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
        <div>
          <h2 className="text-center mt-10 text-xl md:text-3xl">
            Photo Detail
          </h2>
          {photo ? (
            <ImageDetailCard photo={photo} />
          ) : (
            <p>No photo data available</p>
          )}
        </div>
      )}
    </>
  );
};

export default PhotoDetail;
