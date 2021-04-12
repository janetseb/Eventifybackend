const express= require('express');
const eventsRouter = express.Router();
const Eventdata= require('../model/Eventdata');



eventsRouter.get('/',function(req,res){
    Eventdata.find()
    .then(function(events)
    {
        console.log(events[0]);
        res.json(events);
    })
    
});


module.exports = eventsRouter;