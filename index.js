const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port =process.env.PORT || 2000;
app.use(cors());
app.use(bodyParser.json());
const eventsRouter = require('./routes/eventRoute');
const mongoose=  require('mongoose');
const signupRouter = require('./routes/signupRoute');
const loginRouter = require('./routes/loginRoute');
const adminRouter = require('./routes/adminRoute');
mongoose.connect('mongodb+srv://userone:userone@janetict.gs42m.mongodb.net/EventsDb?retryWrites=true&w=majority',{ useFindAndModify: false , useNewUrlParser: true,useUnifiedTopology: true },()=>console.log('Connected to db'));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.urlencoded({extended:true}));
app.use('/events',eventsRouter);
app.use('/signup',signupRouter);
app.use('/login',loginRouter);
app.use('/admin',adminRouter);
app.get("/",(req,res)=>{
    res.send("we are live at 6pm");
});



app.listen(port,()=>{
    console.log(`${port}`);
});