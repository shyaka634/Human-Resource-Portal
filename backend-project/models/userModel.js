import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import employeeSchema from "./employeeModel.js";

const userSchema= sequelize.define("User",{
    UserID:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    EmployeeID:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:"mk_employees",
            key:"EmployeeID",
        }
    },
    UserName:{
        type:DataTypes.STRING,
        allowNull:false,

    },
    Password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
},{tableName:"mk_user"})

userSchema.belongsTo(employeeSchema,{foreignKey:"EmployeeID", onDelete:"CASCADE", onUpdate:"CASCADE"})
employeeSchema.belongsTo(userSchema,{foreignKey:"EmployeeID"})

export default userSchema;