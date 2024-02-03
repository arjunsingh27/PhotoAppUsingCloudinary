import React from "react";

const Card = (props) => {
   

  return (
    <div className="max-w-sm bg-white  drop-shadow-2xl border border-gray-200 rounded-lg shadow dark:bg-gray-700 dark:border-gray-700">
      <img
        className="rounded-lg h-60 w-4/6 mx-auto object-cover  mt-5 pt-1 "
        src={props.image.imageurl}
     
        alt={props.image.title}
      />

      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {props.image.title}
        </h5>

        <p className="text-slate-100 ">
          {props.image.description.length > 30
            ? `${props.image.description.slice(0, 30)}... `
            : props.image.description}
          {props.image.description.length > 30 && (
            <span className="text-blue-500 cursor-pointer">Read more</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default Card;
