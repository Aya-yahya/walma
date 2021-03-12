import express from 'express'
import path from 'path'
import multer from 'multer'
const router = express.Router()

const storage = multer.diskStorage({
  // https://github.com/expressjs/multer
  destination(req, file, cb) {
    // first argument is null because 'there's no error'?
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    //we make the filename contain the fieldname and date of upload to ensure unique filenames. we also get the extension using node's path method
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  //keep in mind that the extname variable and extname path method are 2 different things. this willl check if the file being uploaded matches extensions in filetypes
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`)
})

export default router
