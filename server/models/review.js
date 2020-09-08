module.exports =(sequelize,DataTypes) =>{
    const Review = sequelize.define('review',{
        
        title:{
            type:DataTypes.STRING,
            allowNull: false,
        },
       
        shoeName:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        
        brandName:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        
        rating:{
            type:DataTypes.STRING,
            allowNull:false,
        },
       
        description:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        author:{
            type:DataTypes.STRING,
        },
        owner:{
            type:DataTypes.INTEGER,
        }
    })
    return Review;
}