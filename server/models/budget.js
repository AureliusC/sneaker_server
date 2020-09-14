module.exports =(sequelize,DataTypes) =>{
    const Budget = sequelize.define('budget',{
        
        title:{
            type:DataTypes.STRING,
            allowNull: false,
        },
       
        date:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        
        amount:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        
        owner:{
            type:DataTypes.INTEGER,
            allowNull:false,
        }
    });
    return Budget;
};