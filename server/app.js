require("dotenv").config();
let express = require('express');
let app = express();
let sequelize = require('./db');

let user =require('./controllers/usercontroller')
let review = require('./controllers/reviewcontroller')

sequelize.sync();

app.use(express.json());


app.use('/user',user)
app.use(require('./middleware/validate-session'));
app.use('/review', review)

app.listen(3210,function(){
    console.log('LOVE TO CODE ');
})