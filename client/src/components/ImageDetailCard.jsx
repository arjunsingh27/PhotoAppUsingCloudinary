import React from "react";
import { Link } from "react-router-dom";
const ImageDetailCard = ({ photo }) => {
  return (
    <div className="flex flex-col md:flex-row w-full  md:w-10/12 bg-white shadow-lg rounded-md overflow-hidden mx-auto my-6  p-10 md:h-dvh">
      <img
        className="w-full md:w-1/2 h-full object-contain rounded-xl"
        src={photo.imageurl}
        alt={photo.title}
      />

      <div className="w-full md:w-1/2 p-6 md:flex justify-center  md:flex-col">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 font-sans">
          {photo.title}
        </h2>
        <Link to="/">
          <p className="text-gray-600">Description: {photo.description}</p>
          <button
            type="button"
            className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4   font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700  "
          >
            Gallery
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ImageDetailCard;
