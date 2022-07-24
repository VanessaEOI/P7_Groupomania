exports.signUpErrors = (error) => {
  let errors = { email: '', password: '' }

  if (error.message.includes('email')) errors.email = 'Email incorrect'

  if (error.message.includes('password'))
    errors.password = 'Le mot de passe doit faire entre 6 et 100 caractères'

  // In case of duplicate content
  if (error.code === 11000) errors.email = 'Cet email existe déjà'

  return errors
}

exports.uploadErrors = (error) => {
  let errors = { format: '', maxSize: '' }

  if (error.message.includes('invalid file'))
    errors.format = 'Format incompatible'

  if (error.message.includes('max size'))
    errors.maxSize = 'Le fichier dépasse 500ko'

  return errors
}
