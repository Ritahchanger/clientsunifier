import Profile from "../assets/icons/user.png";
import { useState, useEffect } from "react";
import Config from "../Config";
import ShareblogModal from "./ShareblogModal";
import axios from "axios";

const SingleBlogComponent = ({ blog }) => {
  const [shareBlog, setShareBlog] = useState(false);
  const [notification, setNotification] = useState(false);

  // Function to handle view count update
  const updateViews = async () => {
    try {
      const response = await axios.put(
        `${Config.baseUrl}/api/blog/add/views/${blog._id}`
      );
      console.log("View count updated successfully", response.data);
    } catch (error) {
      console.error(
        `There was an error updating the view count: ${error.message}`
      );
    }
  };

  useEffect(() => {
    updateViews();
  }, []);

  const handleToggleNotification = () => {
    setNotification(!notification);
  };

  const handleToggleShareModal = () => {
    setShareBlog(!shareBlog);
  };

  const renderDescription = () => {
    const sentences = blog.description.split("\\n");
    return sentences.map((paragraph, index) => (
      <p key={index} className="description" style={{ marginTop: "1rem" }}>
        {paragraph}
      </p>
    ));
  };

  return (
    <div className="single-blog">
      <div className="header flex">
        <div className="right">
          <div className="profile flex">
            <img src={Profile} className="profile-image" alt="Profile" />
            <p className="medium-header">bemieditors</p>
            <p className="medium-header">
              {new Date(blog.createdAt).toLocaleDateString()} - 2 min read
            </p>
          </div>
        </div>
        <div className="left">
          <p className="eclipseIcon" onClick={handleToggleNotification}>
            <i className="fas fa-ellipsis-v"></i>
          </p>
          <div
            className={`share-blog flex ${notification ? "active" : ""}`}
            onClick={handleToggleShareModal}
          >
            <p>
              <i className="fa-solid fa-share"></i>
            </p>
            <p className="medium-header">Share</p>
          </div>
        </div>
      </div>
      <p className="large-headers" style={{ textAlign: "center" }}>
        {blog.title}
      </p>
      <p style={{ textAlign: "center" }} className="description">
        Updated: {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      <img
        src={`${Config.baseUrl}/uploads/blogs/${blog.imageUrl}`}
        alt={blog.title}
      />
      <div className="description">{renderDescription()}</div>
      <p className="large-headers" style={{ marginTop: "1rem" }}>
        Reference
      </p>
      <p className="medium-header" style={{ textAlign: "start" }}>
        {blog.reference}
      </p>
      <div className="social-icons">
        <div className="flex">
          <p>
            <i className="fa-brands fa-square-facebook"></i>
          </p>
          <p>
            <i className="fa-brands fa-x-twitter"></i>
          </p>
          <p>
            <i className="fa-brands fa-linkedin"></i>
          </p>
          <p>
            <i className="fa-solid fa-link"></i>
          </p>
        </div>
      </div>
      <p className="large-headers">{`${blog.views} views ${blog.comments} comments`}</p>
      <ShareblogModal
        handleShowBlogModal={handleToggleShareModal}
        shareBlog={shareBlog}
      />
    </div>
  );
};

export default SingleBlogComponent;
