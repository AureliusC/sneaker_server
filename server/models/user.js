module.exports = (sequlize, DataTypes) =>{
    const User = sequlize.define('user',{
        firstName:{
            type:DataTypes.STRING,
            allowNull:false,
            
        },
        lastName:{
            type:DataTypes.STRING,
            allowNull:false,
            
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
        },   
        
    });
    return User;
};