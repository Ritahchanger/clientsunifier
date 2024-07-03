import ShareblogModal from "./ShareblogModal";
import { useState } from "react";
import BlogProfileCard from "./BlogProfileCard";
import { Link } from "react-router-dom";
import Config from "../Config";
const BlogItem = ({ blog }) => {
  const [shareBlog, showShareBlogModal] = useState(false);
  const [notification, showNotification] = useState(false);
  const handleShowNotification = () => {
    showNotification(!notification);
  };
  const handleShowBlogModal = () => {
    showShareBlogModal(!shareBlog);
  };
  return (
    <div className="card flex">
      <div className="col">
        <Link to={`/academic-blogs/${blog._id}`}>
          <img
            src={`${Config.baseUrl}/uploads/blogs/${blog.imageUrl}`}
            alt=""
          />
        </Link>
      </div>
      <div className="col">
        <div className="profile flex">
          <BlogProfileCard />
          <p className="eclipseIcon" onClick={handleShowNotification}>
            <i class="fas fa-ellipsis-v"></i>
          </p>
          <div
            className={`share-blog flex ${notification ? "active" : null}`}
            onClick={handleShowBlogModal}
          >
            <p>
              <i class="fa-solid fa-share"></i>
            </p>
            <p className="medium-header">Share</p>
          </div>
        </div>
        <Link to={`/academic-blogs/${blog._id}`}>
          {" "}
          <p className="large-headers">{blog.title}</p>
        </Link>
        <Link to={`/academic-blogs/${blog._id}`}>
          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor
            quaerat aperiam et blanditiis nihil sunt perferendis, autem,
            corrupti quae, obcaecati voluptas assumenda consectetur? Vel cumque
            magni velit ducimus consequuntur eos!
          </p>
        </Link>
        <div className="control-icons flex">
          <p>{`Views ${blog.views}`}</p>
          <p>0 comments</p>
          <p>
            1 <i class="fa-regular fa-heart"></i>
          </p>
        </div>
      </div>
      <ShareblogModal
        handleShowBlogModal={handleShowBlogModal}
        shareBlog={shareBlog}
      />
    </div>
  );
};

export default BlogItem;
