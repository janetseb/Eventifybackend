  
const mongoose=  require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
   title: String,
   date : String,
   description : String,
   image : String
});

var Eventdata =mongoose.model('Eventdata',EventSchema);

module.exports = Eventdata;