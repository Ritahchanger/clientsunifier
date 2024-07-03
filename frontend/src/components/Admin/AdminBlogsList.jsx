import Config from "../../Config";

const AdminBlogsList = ({ handleEditModal, blog, handleWorkingBlog,handleDeleteModal }) => {
  return (
    <tr key={blog._id}>
      <td>
        {blog.title}
      </td>
      <td>{blog.views}</td>
      <td>{blog.comments}</td>
      <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
      <td>{blog.likes}</td>
      <td>
        <button
          className="table-btn"
          onClick={() => {
            handleWorkingBlog(blog);
            handleEditModal();
          }}
        >
          Edit
        </button>
      </td>
      <td>
        <button className="table-btn" onClick={()=>{
          handleWorkingBlog(blog)
          handleDeleteModal()
        }}>Delete</button>
      </td>
    </tr>
  );
};

export default AdminBlogsList;
