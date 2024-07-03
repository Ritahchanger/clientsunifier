import HomeNavbar from "../../../components/HomeNavbar/HomeNavbar";
import "../Academicblogs/AcademicBlog.css";
import "./SingleBlog.css";
import SingleBlogComponent from "../../../components/SingleBlogComponent";
import Footer from "../../../components/Footer/Footer";
import RecentPost from "../../../components/RecentPost";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Config from "../../../Config";

const SingleBlogPage = () => {
  const [recentPosts, setRecentPosts] = useState(null);
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSingleBlog = async () => {
    try {
      const response = await axios.get(`${Config.baseUrl}/api/blog/${blogId}`);

      if (response.data.success) {
        setBlog(response.data.data); // Assuming response.data.data contains the blog object
        setLoading(false);
      } else {
        throw new Error(
          "There was a problem fetching the data from the backend"
        );
      }
    } catch (error) {
      console.log(`There was a problem accessing the server: ${error.message}`);
      setLoading(false); // Handle loading state appropriately on error
    }
  };

  const fetchRecentBlogs = async () => {
    try {
      const response = await axios.get(
        `${Config.baseUrl}/api/blog/all?page=1&limit=6`
      );

      if (response.data.success) {
        setRecentPosts(response.data.data);
      } else {
        throw new Error(
          `There was an error fetching the data from the server!`
        );
      }
    } catch (error) {
      console.log(
        `There was an error fetching the data from the backend ${error.message}`
      );
    }
  };
  useEffect(() => {
    fetchRecentBlogs();
  }, []);
  useEffect(() => {
    fetchSingleBlog();
  }, [blogId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [blogId]);
  return (
    <div className="academic-blog single-recentPosts">
      <HomeNavbar />
      {loading ? (
        <p>Loading...</p>
      ) : blog ? (
        <>
          <div className="container" style={{ marginTop: "60px" }}>
            <SingleBlogComponent blog={blog} />
          </div>
          <div className="container">
            <p className="medium-header" style={{ textAlign: "start" }}>
              Recent Posts
            </p>
          </div>
          <div className="container">
            <div className="grid">
              {recentPosts.map((recentPost) => (
                <RecentPost
                  recentPost={recentPost}
                  key={recentPost._id}
                  fetchRecentBlogs={fetchRecentBlogs}
                  blogId={blog._id}
                />
              ))}
            </div>
          </div>
          <div className="container">
            <div className="comment-container">
              <p className="large-headers">Comments</p>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="Write a comment..."
              ></textarea>
            </div>
          </div>
        </>
      ) : (
        <p>No blog found for ID: {blogId}</p>
      )}
      <Footer />
    </div>
  );
};

export default SingleBlogPage;
