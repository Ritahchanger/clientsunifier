const router = require('express').Router()

const multer = require('multer')

const path = require('path')

const BlogController = require('../controllers/BlogController')


const storage = multer.diskStorage({

  destination: function (req, file, cb) {

    const uploadDirectory = path.join(__dirname, '../uploads/blogs/')

    cb(null, uploadDirectory)

  },

  filename: function (req, file, cb) {

    const uniqueSuffix = Date.now()

    cb(null, uniqueSuffix + file.originalname)

  }

})

const upload = multer({ storage: storage })

router.post('/post/', upload.single('file'), BlogController.addBlogItem)

router.get('/all/', BlogController.getBlogItems)


router.get('/:id', BlogController.getBlogById)

router.patch('/update/:id',upload.single('file'),BlogController.updateBlogItem)

router.delete('/delete/:id',BlogController.deleteBlog)

router.put('/add/views/:blogId',BlogController.registerView)

router.put('/add/likes/:blogId',BlogController.registerLikes)


module.exports = router
