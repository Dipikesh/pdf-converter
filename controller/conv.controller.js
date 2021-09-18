const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises;
const {imageConv} = require('../services/conv.services')
exports.convController = async(req, res, next) => {
    try {

      
        const imageId = await imageConv(res, req.files);
        // console.log(imageLoc);
        res.status(201).json({ data: imageId });
       

    }
    catch (err) {
        console.error("error in convController " + err);
        res.status(500).json({ message: "Internal Server Error" });
    }
    
 
}

exports.getPdfController = async(req, res, next) => {
    try {
        console.log("get ");
        const fileName = req.query.fileName;
  
        const pdfPath = path.join(__dirname, '../', `output/${fileName}`);
    
    
        const dirError = await fsPromises.access(pdfPath);
        if (dirError) {
            console.log("dir"+dirError);
            
             res.status(404).json({ message:"Pdf Not Found"});
        }
        // obs_clean();
        // flush();
        // res.header('Content-Type', 'application/pdf');
        // res.header("Content-Disposition:attachment;filename='downloaded.pdf'"); 
             res.status(200).sendFile(pdfPath);
  
    }
    catch (err) {
        res.status(404).json({ message: "Image Not Found" });
    }
    
}

exports.staticController = async(req, res, next) => {
    const staticPath = path.join(__dirname, '../', '/public/home.js');
    res.status(200).sendFile(staticPath);
}

exports.favController = async (req, res, next) => {
    //  console.log(__dirname);
    const staticPath = path.join(__dirname, '../', '/public/icons8-document-100.png');

    res.status(200).send(staticPath);
}