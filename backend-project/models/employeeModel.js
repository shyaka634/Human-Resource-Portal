import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import postSchema from "./postModel.js";
const employeeSchema= sequelize.define("Employee",{
    EmployeeID:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    PostID:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:"mk_post",
            key:"PostID"
        }
    },
    FirstName:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    LastName:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    Gender:{
        type:DataTypes.ENUM("male","female"),
        allowNull:false,
    },
    DateOfBirth:{
        type:DataTypes.DATE,
        allowNull:false,

    },
    Email:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    PhoneNumber:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    Position:{
        type:DataTypes.STRING,
        allowNull:false,

    },
    HiredDate:{
        type:DataTypes.DATE,
        allowNull:false,

    },
    Salary:{
        type:DataTypes.INTEGER,
        allowNull:false,

    },
    Status:{
        type:DataTypes.ENUM("Active","Not Active"),
        allowNull:false,

    },
    Department:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    Address:{
        type:DataTypes.STRING,
        allowNull:false,
    },
},{tableName:"mk_employees", timestamps:true})

employeeSchema.belongsTo(postSchema,{foreignKey:"PostID", onDelete:"CASCADE", onUpdate:"CASCADE"})
postSchema.hasMany(employeeSchema,{foreignKey:"PostID"})

export default employeeSchema;