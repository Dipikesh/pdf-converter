const PDFDocument = require('pdfkit');
const fs = require('fs');
const multer = require('multer')
const path = require('path');

// Create a document

// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
exports.imageConv = (res, file) => {
        const doc = new PDFDocument();
    
        let filePath = file.filename;
        let splitName = filePath.split(".");
        let pdfName = splitName[0];
    const pdfFile = path.join(__dirname, '../', `/output/${pdfName}.pdf`);
       const pdfStream = fs.createWriteStream(pdfFile);

        doc.image(file.path, {
            fit: [500, 500],
            align: 'fit',
            valign: 'center'
        });

        // Finalize PDF file
        doc.pipe(pdfStream);
    doc.end();
    
    
          
    // HERE PDF FILE IS DONE
        return `${pdfName}.pdf`;

        
    
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