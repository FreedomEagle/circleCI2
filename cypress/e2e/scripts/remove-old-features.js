const glob = require('glob')
const fs = require('fs')

const CYPRESS_DIR = 'cypress/integration'
const GHERKIN_DIR = 'gherkin-features'

const getDirectories = (src, callback) => {
  glob(`${src}/**/*.feature`, callback)
}

const isFileToDelete = (f) => {
  const filename = f.replace(CYPRESS_DIR, '')
  const gherkinFile = `${GHERKIN_DIR}${filename}`
  const exists = fs.existsSync(gherkinFile)
  return !exists
}

const deleteFile = (f) => {
  console.log('Deleting old feature file', f)
  fs.unlinkSync(f)
}

getDirectories(CYPRESS_DIR, (err, res) => {
  if (err) {
    console.log('Error getting directories: ', err.message)
  } else {
    const filesToDelete = res.filter(isFileToDelete)
    filesToDelete.forEach(deleteFile)
  }
})
