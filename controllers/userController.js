const User = require('../models/UserModel')

//Control IDs in db
const ObjectId = require('mongoose').Types.ObjectId

exports.getAllUsers = (req, res) => {
  User.find()
    .select('-password')
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(404).json({ error }))
}

exports.getOneUser = (req, res) => {
  // Check if id passed in params is known
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send('ID inconnue : ' + req.params.id)
  User.findById(req.params.id, (error, docs) => {
    if (!error) res.send(docs)
    else console.log('ID inconnue : ' + error)
  }).select('-password')
}

exports.deleteUser = (req, res) => {
  // Check if id passed in params is known
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send('ID inconnue : ' + req.params.id)

  try {
    User.deleteOne({ _id: req.params.id }).exec()
    res.status(200).json({ message: 'Utilisateur supprimé' })
  } catch (error) {
    return res.status(500).json({ error })
  }
}
