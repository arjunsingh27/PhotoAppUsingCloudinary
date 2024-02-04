import React, { useState } from "react";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [failed, setFailed] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleUpload = async () => {
    if (!file || !title || !description) {
      alert("Please fill in all the fields.");
    } else {
      try {
        setProcessing(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        formData.append("description", description);

        const response = await fetch("https://photomanagementapp.onrender.com/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        console.log(data);
        if (data.success === true) {
          setSucceeded(true);
        } else if (data.success === false) {
          setFailed(true);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setProcessing(false);
      }
    }
  };

  return (
    <div className="bg-slate-400 h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-96 m-10">
        <h2 className="text-2xl font-semibold mb-6">Upload Picture</h2>

        <form className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter title"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              required
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter description"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
          <div>
            <label htmlFor="file" className="block text-sm font-medium text-gray-700">
              Upload Picture
            </label>
            <input
              type="file"
              id="file"
              name="file"
              className="mt-1"
              accept="image/*"
              required={true}
              onChange={handleFileChange}
            />
          </div>

          <button
            type="button"
            onClick={handleUpload}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
            disabled={processing || disabled || succeeded}
          >
            <span>
              {processing ? <p>Processing</p> : succeeded ? "Uploaded" : failed ? "Failed: Retry" : "Upload"}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Upload;
