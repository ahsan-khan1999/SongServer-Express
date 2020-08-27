const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var SongSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    artist:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
},  {
        timeStamps:true
    }

)

const Song = mongoose.model('Song',SongSchema)
module.exports = Song;