const express = require('express')
var Song = require('../models/song')
const bodyParser = require('body-parser')
const songRouter = express.Router();
songRouter.use(bodyParser.json());
const multer = require('multer')
const fileUpload =require('express-fileupload');
const path =require('path');
songRouter.use(fileUpload({ safeFileNames: true, preserveExtension: true }));

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
    // Song.create(req.body,(err,resp) =>{
      if(req.files) {
          console.log(req.files);
          var file = req.files.file;
          var filename = file.name;
          console.log(filename);
          file.mv(path.resolve(__dirname,'../public/images',filename),(err) => {
              if(err){
                  console.log(err);
                return;
              }
              else{
                res.statusCode = 200;
                res.end('File uploaded !');
              }
          })
          
      }
      else{
        res.statusCode = 404
        res.setHeader('Content_Type','text/plain');
        res.end('Not Successfully inserted audio file');
      }
      
      

    
    
});

module.exports = songRouter;