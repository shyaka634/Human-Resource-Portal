import { Sequelize } from "sequelize";

const sequelize= new Sequelize("mk_cars","root","",{
    host:"localhost",
    dialect:"mysql",
    port:3307
})

export async function connectDB(){
    try {
        sequelize.authenticate()
        console.log("Connected to db successfully") 
    } catch (error) {
        console.error("Error occured when connecting to db",error)
    }
}
export default sequelize;