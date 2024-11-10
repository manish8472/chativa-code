const grid = require('gridfs-stream');
const mongoose = require('mongoose');

const url = "http://localhost:5000"

let gfs, gridFSBucket;
const conn = mongoose.connection;
conn.once('open', ()=> {
    gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    })
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
})

const uploadFiles = async (req, res ) =>{

 try{
     if (!req.file) {
       return res.status(404).json({ msg: "File not found" });
     }

     const imageurl = `${url}/file/${req.file.filename}`;

     return res.status(200).json(imageurl);
 }catch(err){
    console.log(err.message)
 }
 

}

const getImage = async(req, res) =>{
    console.log(req.params)
    try{
      const file = await gfs.files.findOne({ filename: req.params.filename });
      // const readStream = gfs.createReadStream(file.filename);
      // readStream.pipe(response);
      const readStream = gridFSBucket.openDownloadStream(file._id);
      readStream.pipe(res);
    }catch(error){
        return res.status(500).json(error.message);
    }
}

module.exports = { uploadFiles, getImage}