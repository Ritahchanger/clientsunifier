import "./DeleteModal.css";
import axios from "axios";
import Config from "../../Config";

const DeleteBlogModal = ({ blog, handleDeleteModal, fetchBlogs, page }) => {
  const handleDeleteBlog = async () => {
    try {
      const response = await axios.delete(
        `${Config.baseUrl}/api/blog/delete/${blog._id}`
      );
      console.log("Blog deleted successfully:", response.data);
      await fetchBlogs(page);
      handleDeleteModal();
    } catch (error) {
      console.log(
        "There was an error deleting the blog from the system!!",
        error
      );
    }
  };

  return (
    <div className="modal-wrapper">
      <p className="medium-header">{`Are you sure you want to delete ${blog?.title?.toUpperCase()}?`}</p>
      <div>
        <button className="submit-btn" onClick={handleDeleteModal}>
          CANCEL
        </button>
        <button className="submit-btn" onClick={handleDeleteBlog}>
          OKAY
        </button>
      </div>
    </div>
  );
};
export default DeleteBlogModal;
