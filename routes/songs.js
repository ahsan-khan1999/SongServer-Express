const express = require('express')
var Song = require('../models/song')
const bodyParser = require('body-parser')
const songRouter = express.Router();
songRouter.use(bodyParser.json());
const multer = require('multer')
const fileUpload = require('express-fileupload');
const path = require('path');
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
    .get((req, res, next) => {
        Song.find({}).then((song) => {
            res.statusCode = 200
            res.setHeader('Content_Type', 'text/plain');
            res.json(song);
        }, (err) => next(err))

    })
    .post((req, res, next) => {
        Song.create(req.body).then((song) => {
            res.statusCode = 200
            res.setHeader('Content_Type', 'application/json');
            res.json(song);
        }, (err) => next(err)).catch((err) => {
            console.log(err);
        });








    })
    .put((req, res, next) => {
        res.statusCode = 403
        res.end('Put Operation is not supported at ', req.params);
    })
    .delete((req, res, next) => {
        Song.remove({}).then((resp) => {
            res.statusCode = 403
            res.setHeader('Content_Type','application/json');
            res.end('All Songs Are Removed',resp);
        },(Err) => next(Err)).catch((err) => {
            console.log(err);
        });
    });
    songRouter.route('/:songId' )

    .get((req,res,next) => {
        Song.findById(req.params.songId).then((song) => {
            res.statusCode = 200
            res.setHeader('Content_Type','application/json');
            res.json(song);
        },(err) => next(err)).catch((err) => {
            console.log(err);
        });
    })
    .post((req,res,next) => {
        res.statusCode = 403
        res.end('Post Operation is not supported at',req.params.songId);
    })
    .put((req,res,next) => {
        Song.findByIdAndUpdate(req.params.songId,{
            $set:req.body
        },{new:true}).then((song) => {
            res.statusCode = 200
            res.setHeader('Content_Type','application/json')
            res.json(song);
        },(err) => next(err)).catch((err) => {
            console.log(err);
        });
    })
    .delete((req,res,next) => {
        Song.findByIdAndRemove(req.params.songId).then((song) => {
            res.statusCode = 200;
            res.setHeader('Content_Type','application/json');
            res.json(song);
        },(err) => next(err)).catch((err) => {
            console.log(err);
        });
    })

module.exports = songRouter;