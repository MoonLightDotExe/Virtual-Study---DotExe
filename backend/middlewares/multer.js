const multer = require('multer')


const multerUpload = multer({
    limits: {
        fileSize: 1024 * 1024 * 5, //5MB
    }
})

const attachmentsMulter = multerUpload.single('files')

module.exports = {
    multerUpload, attachmentsMulter
}