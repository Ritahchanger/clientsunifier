import axios from "axios";
import Config from "../Config";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const RecentPost = ({ recentPost, fetchRecentBlogs, blogId }) => {
  useEffect(() => {
    fetchRecentBlogs();
  }, [fetchRecentBlogs, blogId]);

  const updateLike = async () => {
    try {
      const response = await axios.put(`${Config.baseUrl}/api/blog/add/likes/${recentPost._id}`);
      console.log('Like updated successfully', response.data);
    } catch (error) {
      console.log(`There was an error updating likes: ${error.message}`);
    }
  };

  return (
    <div className="card">
      <div className="img-wrapper">
        <Link to={`/academic-blogs/${recentPost._id}`}>
          <img
            src={`${Config.baseUrl}/uploads/blogs/${recentPost.imageUrl}`}
            alt="book"
          />
        </Link>
      </div>
      <Link to={`/academic-blogs/${recentPost._id}`}>
        <div className="large-headers" style={{ padding: "1rem" }}>
          {recentPost.title}
        </div>
      </Link>
      <div className="control-icons flex" style={{ margin: "1rem" }}>
        <p>{`Views ${recentPost.views}`}</p>
        <p>{`Comments ${recentPost.comments}`}</p>
        <p onClick={updateLike} style={{cursor:"pointer"}}>
         {recentPost.likes} <i className="fa-regular fa-heart"></i>
        </p>
      </div>
    </div>
  );
};

export default RecentPost;
