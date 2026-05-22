import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
const postSchema= sequelize.define("Post",{
    PostID:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    PostName:{
        type:DataTypes.STRING,
        allowNull:false,
    }
},{tableName:"mk_post"})

export default postSchema;