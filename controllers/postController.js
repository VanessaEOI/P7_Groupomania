const Post = require('../models/PostModel')
const User = require('../models/UserModel')
const fs = require('fs')

//Control IDs in db
const ObjectID = require('mongoose').Types.ObjectId

exports.readPost = (req, res) => {
  Post.find()
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(404).json({ error }))
}

exports.createPost = async (req, res) => {
  const post = new Post({
    posterId: req.body.posterId,
    message: req.body.message,
    picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likers: [],
  })
  post
    .save()
    .then(() => res.status(201).json({ message: 'Post enregistrée !' }))
    .catch((error) => res.status(400).json({ error }))
}

exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id)

  const updatedRecord = req.file
    ? {
        posterId: req.body.posterId,
        message: req.body.message,
        picture: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body }

  Post.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs)
      else console.log('Update error : ' + err)
    }
  )
}

exports.deletePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id)

  Post.findByIdAndDelete({ _id: req.params.id })
    .then((post) => {
      const filename = post.picture.split('/images/')[1]
      fs.unlink(`images/${filename}`, () => {
        Post.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Post supprimée !' }))
          .catch((error) => res.status(403).json({ error }))
      })
    })
    .catch((error) => res.status(500).json({ error }))
}

exports.likePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnue : ' + req.params.id)

  try {
    Post.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.id },
      },
      {
        new: true,
      },
      (error, docs) => {
        if (error) return res.status(400).json({ error })
      }
    )
    User.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { likes: req.params.id },
      },
      { new: true },
      (error, docs) => {
        if (!error) res.send(docs)
        else return res.status(400).json({ error })
      }
    )
  } catch (error) {
    return res.status(400).json({ error })
  }
}

exports.unlikePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID inconnue : ' + req.params.id)

  try {
    Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id },
      },
      {
        new: true,
      },
      (error, docs) => {
        if (error) return res.status(400).json({ error })
      }
    )
    User.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { likes: req.params.id },
      },
      { new: true },
      (error, docs) => {
        if (!error) res.send(docs)
        else return res.status(400).json({ error })
      }
    )
  } catch (error) {
    return res.status(400).json({ error })
  }
}
