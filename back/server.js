const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// MULTER
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images')
  },
  filename: function (req, file, cb) {
    let uploadFile = file.originalname.split('.')
    let name = `${uploadFile[0]}-${Date.now()}.${uploadFile[uploadFile.length-1]}`
    cb(null, name)
  }
})
const upload = multer({ storage: storage })

app.get('/', (req, res) => {
  res.status(200).send('You can post to /api/upload.');
});


app.post('/api/upload', upload.array('photos', 12), function (req, res, next) { 

    try{
      let files = req.files;
      console.log(files);
      if(!files.length){
        return res.status(400).json({ err:'Please upload an image', msg:'Please upload an image' })
      }
      let file = req.files[0]
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          return res.json({"image" : file.filename}) 
      }
    }
    catch(error){
      return res.send(error.message)
    }
  })

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `server is running at http://localhost:${process.env.PORT || 3000}`
  );
});