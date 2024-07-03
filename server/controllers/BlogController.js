const BlogItem = require('../models/Blog.model')

require('dotenv').config()

const fs = require('fs').promises

const path = require('path')

const uploadDirectory = path.join(__dirname, '../uploads/blogs/')

const addBlogItem = async (req, res, next) => {
  try {
    const { title, description, readTime, reference } = req.body

    const imageUrl = req.file.filename

    if (!imageUrl) {
      return res
        .status(200)
        .json({ success: false, error: 'imageUrl is required' })
    }

    const newBlogItem = new BlogItem({
      title,
      description,
      imageUrl,
      readTime,
      reference
    })

    await newBlogItem.save()

    return res
      .status(200)
      .json({ status: 200, success: true, data: newBlogItem })
  } catch (error) {
    next(error)
  }
}

const getBlogItems = async (req, res, next) => {
  try {
    const { page = 1, limit = 2 } = req.query
    const pageInt = parseInt(page)
    const limitInt = parseInt(limit)

    if (isNaN(pageInt) || isNaN(limitInt) || pageInt < 1 || limitInt < 1) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid page or limit parameters' })
    }

    const blogs = await BlogItem.find({}).sort({ createdAt: -1 })

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ success: false, message: 'No blogs found' })
    }

    const startIndex = (pageInt - 1) * limitInt
    const endIndex = startIndex + limitInt
    const paginatedBlogs = blogs.slice(startIndex, endIndex)

    const totalPages = Math.ceil(blogs.length / limitInt)
    const nextPage =
      endIndex < blogs.length
        ? `${process.env.BASE_URL}/api/blog/all?page=${
            pageInt + 1
          }&limit=${limitInt}`
        : null
    const prevPage =
      startIndex > 0
        ? `${process.env.BASE_URL}/api/blog/all?page=${
            pageInt - 1
          }&limit=${limitInt}`
        : null

    return res.status(200).json({
      success: true,
      limit: limitInt,
      page: pageInt,
      totalPages,
      nextPage,
      prevPage,
      data: paginatedBlogs
    })
  } catch (error) {
    next(error)
  }
}
const getBlogById = async (req, res, next) => {
  try {
    const blogId = req.params.id

    const blog = await BlogItem.findById(blogId)

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' })
    }

    return res.status(200).json({ success: true, data: blog })
  } catch (error) {
    next(error)
  }
}

const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params

    const blogToDelete = await BlogItem.findById(id)

    if (!blogToDelete) {
      return res
        .status(404)
        .json({ success: false, message: 'No such blog with the provided Id' })
    }
    if (blogToDelete.filePath) {
      const filePath = path.join(uploadDirectory, blogToDelete.filePath)
      await fs.promises.unlink(filePath)
    }

    await BlogItem.findByIdAndDelete(id)

    return res
      .status(200)
      .json({ success: true, message: 'Blog deleted successfully' })
  } catch (error) {
    next(error)
  }
}

const updateBlogItem = async (req, res, next) => {
  const { id } = req.params
  try {
    const blog = await BlogItem.findById(id)
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, error: 'Blog item not found' })
    }
    console.log('Fetched Blog Item:', blog)
    if (req.file) {
      const newFilePath = req.file.filename
      const oldFilePath = blog.imageUrl
      blog.imageUrl = newFilePath
      if (oldFilePath) {
        try {
          await fs.unlink(path.join(uploadDirectory, oldFilePath))
          console.log('Deleted old blog image:', oldFilePath)
        } catch (err) {
          console.error('Error deleting old blog image:', err)
        }
      }
    }
    if (req.body.title) {
      blog.title = req.body.title
      console.log('Updated blog title:', req.body.title)
    }
    if (req.body.description) {
      blog.description = req.body.description
      console.log('Updated blog description:', req.body.description)
    }
    if (req.body.readTime) {
      blog.readTime = req.body.readTime
      console.log('Updated blog read time:', req.body.readTime)
    }
    if (req.body.reference) {
      blog.reference = req.body.reference
      console.log('Updated blog reference:', req.body.reference)
    }
    const updatedBlog = await blog.save()
    console.log('Updated Blog Item:', updatedBlog)

    return res.status(200).json({
      success: true,
      message: 'The blog updated successfully',
      data: updatedBlog
    })
  } catch (error) {
    next(error)
  }
}

const registerView = async (req, res, next) => {
  const { blogId } = req.params;
  try {
    const blogItem = await BlogItem.findById(blogId)

    if (!blogItem) {
      return res.status(200).json({
        status: 404,
        success: false,
        message: 'The blog item was not found!'
      })
    }

    blogItem.views += 1

    await blogItem.save()

    return res.status(200).json({ status: 200, success: true, data: blogItem })
  } catch (error) {
    next(error)
  }
}
const registerLikes = async (req, res, next) => {
  const { blogId } = req.params;
  try {
    const blogItem = await BlogItem.findById(blogId)

    if (!blogItem) {
      return res.status(200).json({
        status: 404,
        success: false,
        message: 'The blog item was not found!'
      })
    }

    blogItem.likes += 1

    await blogItem.save()

    return res.status(200).json({ status: 200, success: true, data: blogItem })
  } catch (error) {
    next(error)
  }
}



module.exports = {
  addBlogItem,
  getBlogItems,
  getBlogById,
  updateBlogItem,
  deleteBlog,
  registerView,
  registerLikes
}
