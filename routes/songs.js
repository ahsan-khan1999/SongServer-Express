const express = require('express')
var Song = require('../models/song')
const bodyParser = require('body-parser')
const songRouter = express.Router();
songRouter.use(bodyParser.json());
const multer = require('multer')


// const multerStorage = multer.diskStorage({
//     destination:(req,file,cb) => {
//         cb(null,'public/images')
//     },
//     filename:(req,file,cb) => {
//         cb(null,file.originalname)

//     }
// });
// const UploadAudio = multer({Storage:multerStorage});



songRouter.route('/')
.get((req,res,next) => {
    Song.find({}).then((song) => {
        res.statusCode = 200
        res.setHeader('Content_Type','text/plain');
        res.json(song);
    },(err) => next(err))
    
})
.post((req,res,next) => {
    Song.create(req.body,(err,resp) =>{
      if(req.file) {
          console.log(req.file);
          var file = req.file;
          var filename = file.name
          console.log(filename);
          res.statusCode = 200
          res.setHeader('Content_Type','text/plain');
          // res.json(req.file);
          res.end('Successfully inserted audio file');    
      }
      res.statusCode = 404
      res.setHeader('Content_Type','text/plain');
      res.end('Not Successfully inserted audio file');
      
    })
    
    
});

module.exports = songRouter;