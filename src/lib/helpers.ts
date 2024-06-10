export function generateRandomFilename(length = 10) {
  // Define the characters to use for the filename
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let filename = ''

  // Generate a random string of the specified length
  for (let i = 0; i < length; i++) {
    filename += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return filename
}
