const router = require('express').Router()

const postController = require('../controllers/postController')
const multer = require('../middleware/multerConfig')

router.get('/', postController.readPost)
router.post('/', multer, postController.createPost)
router.put('/:id', multer, postController.updatePost)
router.delete('/:id', postController.deletePost)
router.patch('/like-post/:id', postController.likePost)
router.patch('/unlike-post/:id', postController.unlikePost)

module.exports = router
