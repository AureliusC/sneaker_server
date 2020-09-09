require("dotenv").config();
let express = require('express');
let app = express();
let sequelize = require('./db');
let cors = require('cors')

let user =require('./controllers/usercontroller')
let review = require('./controllers/reviewcontroller')

sequelize.sync();

app.use(cors())
app.use(express.json());


app.use('/user',user)
app.use(require('./middleware/validate-session'));
app.use('/review', review)

app.listen(process.env.PORT,function(){
    console.log(`*********App is listening on ${process.env.PORT}*********`);
});