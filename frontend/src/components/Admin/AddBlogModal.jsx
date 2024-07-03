import React, { useState } from "react";
import axios from "axios";
import Config from "../../Config";
import Preloader from "../../Preloader/Preloader";

import { showLoading, hideLoading } from "../../Redux/features/AlertSlice";

import { useDispatch, useSelector } from "react-redux";

const AddBlogModal = ({ fetchBlogs, page,handleAddModal }) => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.alerts.loading);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reference, setReference] = useState("");
  const [image, setImage] = useState(null);
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [referenceError, setReferenceError] = useState("");
  const [imageError, setImageError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const sendDataToBackend = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("readTime", "08:00");
      formData.append("reference", reference);
      formData.append("file", image);
      dispatch(showLoading());
      const response = await axios.post(
        `${Config.baseUrl}/api/blog/post/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchBlogs(page);
      console.log("Response from backend:", response.data);
      setTitle("");
      setDescription("");
      setReference("");
      setImage(null);
      setTitleError("");
      setDescriptionError("");
      setReferenceError("");
      setImageError("");
      setUploadSuccess(true);
      dispatch(hideLoading());
      handleAddModal()
    } catch (error) {
      console.error("Error sending data to backend:", error);
      dispatch(hideLoading());
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (titleError) {
      setTitleError("");
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    if (descriptionError) {
      setDescriptionError("");
    }
  };

  const handleReferenceChange = (e) => {
    setReference(e.target.value);
    if (referenceError) {
      setReferenceError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formIsValid = true;

    if (!title.trim()) {
      setTitleError("Please enter the blog's title.");
      formIsValid = false;
    }

    if (!description.trim()) {
      setDescriptionError("Please enter the blog's description.");
      formIsValid = false;
    }

    if (!reference.trim()) {
      setReferenceError("Please enter the blog's reference.");
      formIsValid = false;
    }

    if (!image) {
      setImageError("Please select an image.");
      formIsValid = false;
    }

    if (formIsValid) {
      sendDataToBackend();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} action="#">
        <p className="medium-header">ADD BLOG</p>
        <p style={{ textAlign: "center" }}>
          Note!! At the end of every paragraph in the description input `\n` for
          system to know the beginning of a new paragraph
        </p>
        <div className="input-group">
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter the blog's title..."
          />
          {titleError && <p className="error">{titleError}</p>}
        </div>

        <div className="input_group">
          <textarea
            name="description"
            value={description}
            onChange={handleDescriptionChange}
            cols="30"
            rows="20"
            placeholder="Enter blog's description..."
          ></textarea>
          {descriptionError && <p className="error">{descriptionError}</p>}
        </div>

        <div className="input-group">
          <input
            type="text"
            name="reference"
            value={reference}
            onChange={handleReferenceChange}
            placeholder="Enter the blog's reference..."
          />
          {referenceError && <p className="error">{referenceError}</p>}
        </div>

        <div className="input_group">
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleImageChange}
            accept="image/*"
            style={{ marginTop: "1rem" }}
          />
          {imageError && (
            <p className="error" style={{ color: "red" }}>
              {imageError}
            </p>
          )}
        </div>

        {image && (
          <div className="image-preview">
            <img src={URL.createObjectURL(image)} alt="Selected" />
          </div>
        )}

        {uploadSuccess && (
          <p style={{ color: "green", marginTop: "1rem" }}>
            Blog uploaded successfully!
          </p>
        )}

        <input
          type="submit"
          value="ADD BLOG"
          className="submit-btn"
          style={{ marginTop: "1.5rem" }}
        />
      </form>
      {loading && <Preloader />}
    </>
  );
};

export default AddBlogModal;
