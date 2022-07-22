exports.signUpErrors = (err) => {
  let errors = { email: '', password: '' }

  if (err.message.includes('email')) errors.email = 'Email incorrect'

  if (err.message.includes('password'))
    errors.password = 'Le mot de passe doit faire entre 6 et 100 caractères'

  // In case of duplicate content
  if (err.code === 11000) errors.email = 'Cet email existe déjà'

  return errors
}

exports.uploadErrors = (err) => {
  let errors = { format: '', maxSize: '' }

  if (err.message.includes('invalid file'))
    errors.format = 'Format incompatible'

  if (err.message.includes('max size'))
    errors.maxSize = 'Le fichier dépasse 500ko'

  return errors
}
