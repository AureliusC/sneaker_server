const Sequelize  = require ('sequelize');
const sequelize=
new Sequelize (
"sneaker-app","postgres","Baller45!",{
    dialect:'postgres', host:"localhost"
});

sequelize.authenticate().then(
    function(){
        console.log('Connected to sneakers app postgres database');
    },
    function(err){
        console.log(err);
    }
);

module.exports = sequelize;