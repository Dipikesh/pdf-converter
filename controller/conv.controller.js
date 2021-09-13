const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {imageConv} = require('../services/conv.services')
exports.convController = (req, res, next) => {
    try {
        const imageId = imageConv(res, req.file);
        // console.log(imageLoc);
        res.status(201).json({ data: imageId });
       

    }
    catch (err) {
        console.error("error in convController" + err);
        res.status(500).json({ message: "Internal Server Error" });
    }
    
 
}

exports.getPdfController = (req, res, next) => {
    console.log("asdf ",req);
    const fileName = req.query.fileName;
  
    const pdfPath = path.join(__dirname, '../', `output/${fileName}`);
    
const dirCheck =  fs.access(pdfPath, function(error) {
  if (error) {
      res.status(404).json({ message: "Not Found, try again" });
      return;
  } else {
    console.log("sdf",pdfPath);
        res.set('Content-Type','application/pdf');
         res.sendFile(pdfPath);
  }
})
        
  
    
    
}

exports.staticController = (req, res, next) => {
    const staticPath = path.join(__dirname, '../', '/public/home.js');
    res.sendFile(staticPath);
}