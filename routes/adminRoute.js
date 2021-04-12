const express= require('express');
const adminRouter = express.Router();
const Eventdata = require('../model/Eventdata');
const multer = require('multer');
const path= require('path');
const cloudinary = require("../config/cloduinaryConfig");

let upload =multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
      let ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
        cb(new Error("File type is not supported"), false);
        return;
      }
      cb(null, true);
    },
  }).single('image'); 
adminRouter.get('/:id',function(req,res){
    const id = req.params.id
    Eventdata.findOne({_id: id})
    .then(function(event){
        res.json(event);
  })   
});

adminRouter.post('/update/:i', function(req,res){
  var id = req.params.i
  var item = { $set : req.body }
  Eventdata.updateOne({_id:id}, item,{ strict:false }, function(err,result) {
      if (err) {
          console.log(err);
      } else {
          res.json({msg : 'updated succesfully'});
      }
  }
  );
}
);


adminRouter.get('/delete/:i', function(req,res){
    const id = req.params.i
    Eventdata.deleteOne({_id:id})
    .then(function(){
        res.json({msg : 'deleted successfully'});
    })

});

adminRouter.post('/upload', upload,
async (req, res) => {
      try {
        const result = await cloudinary.uploader.upload(req.file.path);
        console.log(result.url);
        res.json({url:result.url});            
      } catch (err) {
        console.log(err);
      }
    }  
);


 adminRouter.post('/add',upload,async function(req,res){

try {
    
     var item = {
       title: req.body.title,
        date: req.body.date,
        description: req.body.description,
        image :req.body.image
      }

    var event = Eventdata(item);
    event.save();
    res.json({msg:"addeded succesfully"});
    
} catch (error) {
    
}

});

module.exports = adminRouter;