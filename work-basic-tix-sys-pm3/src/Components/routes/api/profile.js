const express = require( 'express' );
const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const path = require( 'path' );

const router = express.Router();
//"start": "react-scripts start",
//"main": "index.js",

const s3 = new aws.S3({
    accessKeyId: 'AKIATIS5GSCGAEGJ2MVO',
    secretAccessKey: '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',
    Bucket: 'esc-images-lt'
   });


//Single upload 
const profileImgUpload = multer({
    storage: multerS3({
     s3: s3,
     bucket: 'esc-images-lt',
     acl: 'public-read',
     //contentDisposition: 'attachment',
     key: function (req, file, cb) {
      cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
     } // create the filename
    }),
    //limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
    fileFilter: function( req, file, cb ){
     checkFileType( file, cb );
    }
   }).single('profileImage');


   /**
 * Check File Type
 * @param file
 * @param cb
 * @return {*}
 */
function checkFileType( file, cb ){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());
    // Check mime
    const mimetype = filetypes.test( file.mimetype );
   if( mimetype && extname ){
     return cb( null, true );
    } else {
     cb( 'Error: Images Only!' );
    }
   }



//********************Routes start here ********************

/**
 * @route POST api/profile/business-img-upload
 * @desc Upload post image
 * @access public
 */
router.post( '/profile-img-upload', ( req, res ) => {
    profileImgUpload( req, res, ( error ) => {
        
       console.log( 'Request: ', req.file );
       console.log( 'error', error );
       
      if( error ){
       console.log( 'errors', error );
       res.json( { error: error } );  
      } else {
       // If File not found
       if( req.file === undefined ){
        console.log( 'Error: No File Selected!' );
        res.json( 'Error: No File Selected' );
       } else {
        // If Success
        const imageName = req.file.key;
        const imageLocation = req.file.location;
        console.log(imageLocation);
        
    // Save the file name into database into profile model
    
    res.json( {
         image: imageName,
         location: imageLocation
        } );
       }
      }
     });
    });

module.exports = router;