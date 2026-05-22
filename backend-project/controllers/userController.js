import User from "../models/userModel.js";
import Employee from "../models/employeeModel.js";
import bcrypt from 'bcrypt'

export async function registerUser(req,res){
    try {
        const {EmployeeID,UserName,Password}= req.body;
        const findUser= await User.findOne({where:{EmployeeID, UserName}})
        if(findUser) return res.status(400).json("User Already exists")
        const findEmployee= await Employee.findByPk(EmployeeID);
        if(!findEmployee) return res.status(400).json("Invalid Employee")
        const hashed= await bcrypt.hash(Password,10);
        const user= await User.create({EmployeeID,UserName,Password:hashed})
        res.status(201).json(user);
    } catch (error) {
        console.error("Error occured when registering User",error)
        res.status(500).json({error:error.message})
    }
}

export async function loginUser(req, res) {

    try {

        const {
            EmployeeID,
            UserName,
            Password
        } = req.body;

        const user = await User.findOne({
            where: { EmployeeID, UserName }
        });

        if (!user) {
            return res.status(400).json(
                "User Not found"
            );
        }

        const employee =
            await Employee.findByPk(EmployeeID);

        if (!employee) {
            return res.status(400).json(
                "Employee Doesn't exist"
            );
        }

        const unhash = await bcrypt.compare(
            Password,
            user.Password
        );

        if (!unhash) {
            return res.status(400).json(
                "Incorrect Password"
            );
        }

        req.session.userId = user.UserID;

        return res.status(200).json(
            "Logged in successfully"
        );

    } catch (error) {

        console.error(
            "Error occurred when logging in user",
            error
        );

        return res.status(500).json({
            error: error.message
        });

    }
}
export async function logoutUser(req,res) {
    try {
        req.session.destroy(err =>{
            if(err) return res.status(401).json("Failed to logout")
            res.status(200).json("Logged out successfully")
        })
    } catch (error) {
        console.error("Error occured when loggin out user",error)
        res.status(500).json({error:error.message})
    }
}

export async function verifyUser(req,res){
    try {
        if(req.session && req.session.userId) {
        return res.status(200).json({isAuthenticated:true})
        }else{
            return res.status(401).json({isAuthenticated:false})
        }  
    } catch (error) {
        console.error("Error occured when verifying user",error);
        res.status(500).json({error:error.message})
    }
}