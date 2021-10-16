const PDFDocument = require('pdfkit');
const fs = require('fs');
const multer = require('multer')
const path = require('path');
const createError = require('http-errors');

// Create a document

// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
exports.imageConv = async (res, file) => {
    try {
        const doc = new PDFDocument();
        if (!file) 
            throw createError(400, "Please upload a file");
        console.log("file properties ",file);
        
        let pdfName = file[0].filename + '_' + Date.now();
        const pdfFile = path.join(__dirname, '../', `/output/${pdfName}.pdf`);
        const pdfStream = await fs.createWriteStream(pdfFile);
        

        console.log("FILE NAME PATH ..", file[0].path);
  
        await doc.image(file[0].path, {
            fit: [500, 500],
            align: 'center',
            valign: 'center'
        });
    
   
        await file.slice(1).forEach(async function (el) {
        

            await doc.addPage().image(el.path, { fit: [500, 500], align: 'center', valign: 'center' })
        })

        // Finalize PDF file
        await doc.pipe(pdfStream);
        doc.end();
    
    
          
        // HERE PDF FILE IS DONE
        return `${pdfName}.pdf`;
    } catch (err) {
        console.log("pdfservice ...", err);
        throw createError.InternalServerError();
    }

        
    
}

exports.imageStorage = multer.diskStorage({
    // Destination to store image     
    destination: './images',

      filename: (req, file, cb) => {
          cb(null, file.fieldname + '_' + Date.now() 
             + path.extname(file.originalname))
            // file.fieldname is name of the field (image)
            // path.extname get the uploaded file extension
    }
});