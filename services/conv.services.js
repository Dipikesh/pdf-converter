const PDFDocument = require('pdfkit');
const fs = require('fs');
const multer = require('multer')
const path = require('path');

// Create a document

// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
exports.imageConv = async (res, file) => {
    try {
        const doc = new PDFDocument();
    
        // let filePath = file.filename;
        // let splitName = filePath.split(".");
        console.log("gh",file[0].path);
        let pdfName = file[0].fieldname + '_' + Date.now();
        const pdfFile = path.join(__dirname, '../', `/output/${pdfName}.pdf`);
        const pdfStream = await fs.createWriteStream(pdfFile);

  
        await doc.image(file[0].path, {
            fit: [500, 500],
            align: 'center',
            valign: 'center'
        });
    
        // for (var l = 0; l<file.length; l++) {}
        await file.slice(1).forEach(async function (el) {
            // console.log("path  ..",el.path,"da ",el.data);
            await doc.addPage().image(el.path, { fit: [500, 500], align: 'center', valign: 'center' })
        })

        // Finalize PDF file
        await doc.pipe(pdfStream);
        doc.end();
    
    
          
        // HERE PDF FILE IS DONE
        return `${pdfName}.pdf`;
    } catch (err) {
        console.log("pdfservice ...",err);
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