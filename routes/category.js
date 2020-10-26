const express = require('express');
const passport = require('passport');
const upload = require('../middleware/upload');
const controller = require('../controllers/category');
const router = express.Router();

// const multer = require('multer');
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, '/upload')
//     },
//     filename: function (req, file, cb) {
//         cb(null, "UploadedOn" + Date.now() + "fileOrigName" + file.originalname)
//     }
// })
// const upload = multer({ storage: storage});
router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll);
router.get('/:id', controller.getById);
router.delete('/:id', controller.remove);
router.post('/', upload.single('image'), passport.authenticate('jwt', {session: false}), controller.create);
router.patch('/:id',upload.single('image'), controller.update);

module.exports = router;