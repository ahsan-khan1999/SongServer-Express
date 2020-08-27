const express = require('express')
var Song = require('../models/song')
const bodyParser = require('body-parser')
const uploadRoute = express.Router();
uploadRoute.use(bodyParser.json());
const fileUpload = require('express-fileupload');
const path = require('path');
uploadRoute.use(fileUpload({ safeFileNames: true, preserveExtension: true }));

uploadRoute.route('/')
    .get((req, res, next) => {
        res.statusCode = 404
        res.end('Get Operation Is Not Supported');
    })
    .post((req, res, next) => {
        if (req.files) {
            console.log(req.files);
            var file = req.files.file;
            var filename = file.name;
            console.log(filename);
            file.mv(path.resolve(__dirname, '../public/images', filename), (err) => {
                if (err) {
                    console.log(err);
                    return;
                }
                else {
                    res.statusCode = 200;
                    res.end('File uploaded !');
                }
            })

        }
        else {
            res.statusCode = 404
            res.setHeader('Content_Type', 'text/plain');
            res.end('Not Successfully inserted audio file');
        }







    })
    .delete((req, res) => {
        res.statusCode = 404

        res.end('Delete Operation Is not Supported!');
    })

    .put((req, res) => {
        res.statusCode = 404

        res.end('Put Operation Is not Supported!');
    });



module.exports = uploadRoute;