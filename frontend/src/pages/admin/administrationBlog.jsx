import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../../components/Admin/AdminNavbar";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminBlogsList from "../../components/Admin/AdminBlogsList";
import AddBlogModal from "../../components/Admin/AddBlogModal";
import EditBlogModal from "../../components/Admin/EditBlog";
import Config from "../../Config";
import CloseIcon from "../../assets/icons/close.png";
import "./Admin.css";
import "./administrationBlog.css";
import DeleteBlogModal from "../../components/Admin/DeleteBlogModal";
const AdministrationBlog = () => {
  const [addModal, showAddModal] = useState(false);
  const [editModal, showEditModal] = useState(false);
  const [deleteModal, showDeleteModal] = useState(false);
  const [blog, setBlog] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sidebar, showSidebar] = useState(false);

  useEffect(() => {
    fetchBlogs(page);
  }, [page]);

  const fetchBlogs = async (pageNumber) => {
    try {
      const response = await axios.get(
        `${Config.baseUrl}/api/blog/all?page=${pageNumber}&limit=10`
      );
      if (response.data.success) {
        setBlogs(response.data.data);
        setTotalPages(response.data.totalPages);
      } else {
        console.log("There was a problem accessing data from the backend");
      }
    } catch (error) {
      console.log(`There was a problem accessing server ${error.message}`);
    }
  };

  const handleAddModal = () => {
    showAddModal(!addModal);
  };

  const handleEditModal = () => {
    showEditModal(!editModal);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      const buttonClass =
        i === page ? "navigation-btns current-page" : "navigation-btns";
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={buttonClass}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const handleShowSidebar = () => {
    showSidebar(!sidebar);
  };

  const handleWorkingBlog = (blog) => {
    setBlog(blog);
  };

  const handleDeleteModal = () => {
    showDeleteModal(!deleteModal);
  };

  return (
    <div className="profile admin blogs">
      <AdminNavbar
        sidebar={sidebar}
        handleShowSidebar={handleShowSidebar}
        title="BLOGS"
      />
      <AdminSidebar sidebar={sidebar} />
      <p className="empty"></p>
      <div className="container">
        <button
          className="submit-btn"
          onClick={handleAddModal}
          style={{ padding: "0.5rem 1rem" }}
        >
          ADD BLOG
        </button>
        <div className="table_wrapper" id="blogs-table">
          <table>
            <thead>
              <tr>
                <td>TITLE</td>
                <td>VIEWS</td>
                <td>COMMENTS</td>
                <td>CREATED AT</td>
                <td>LIKES</td>
                <td>Edit</td>
                <td>Delete</td>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <AdminBlogsList
                  key={blog.id}
                  blog={blog}
                  handleEditModal={handleEditModal}
                  handleWorkingBlog={handleWorkingBlog}
                  handleDeleteModal={handleDeleteModal}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination" style={{ marginTop: "10px" }}>
          {renderPageNumbers()}
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="navigation-btns"
          >
            Prev
          </button>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="navigation-btns"
          >
            Next
          </button>
        </div>
      </div>
      <div className={`modal addblog ${addModal ? "active" : null}`}>
        <div className="close-icon" onClick={handleAddModal}>
          <img src={CloseIcon} alt="" />
        </div>
        <AddBlogModal fetchBlogs={fetchBlogs} page={page} handleAddModal={handleAddModal}/>
      </div>
      <div className={`modal editblog ${editModal ? "active" : null}`}>
        <div className="close-icon" onClick={handleEditModal}>
          <img src={CloseIcon} alt="" />
        </div>
        <EditBlogModal
          blog={blog}
          fetchBlogs={fetchBlogs}
          page={page}
          handleEditModal={handleEditModal}
        />
      </div>

      <div className={`delete modal ${deleteModal ? "active" : null}`}>
        <DeleteBlogModal
          blog={blog}
          handleDeleteModal={handleDeleteModal}
          fetchBlogs={fetchBlogs}
          page={page}
        />
      </div>
    </div>
  );
};

export default AdministrationBlog;
