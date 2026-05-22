import Employee from "../models/employeeModel.js";
import Post from "../models/postModel.js";

export async function insertEmployee(req,res){
    try {
        const{PostID,FirstName,LastName,Gender,DateOfBirth,Email,PhoneNumber,Position,HiredDate,Salary,Status,Department,Address}= req.body;
        const findEmployee= await Employee.findOne({where:{PostID,FirstName,LastName,Gender,DateOfBirth,Email,PhoneNumber,Position,HiredDate,Salary,Status,Department,Address}})
        if (findEmployee) return res.status(400).json("Employee Already exists");
        const findPost= await Post.findByPk(PostID)
        if(!findPost) return res.status(400).json("Post Doesn't exist")
        const employee= await Employee.create({PostID,FirstName,LastName,Gender,DateOfBirth,Email,PhoneNumber,Position,HiredDate,Salary,Status,Department,Address})
        res.status(201).json(employee)
    } catch (error) {
        console.error("error occred when inserting employee",error)
        res.status(500).json({error:error.message})
    }
}
export async function getAllEmployees(req,res){
    try {
        const employees= await Employee.findAll()
        if(!employees) return res.status(400).json("Employee doesn't exists");
        res.status(200).json(employees);
    } catch (error) {
        console.error("Error occured when getting all employees",error)
        res.status(500).json({error:error.message})
    }
}

export async function getEmployeeById(req,res){
    try {
        const {EmployeeID}= req.params;
        const getEmployee= await Employee.findByPk(EmployeeID);
        if(!getEmployee) return res.status(400).json("Employee doesn't exist");
        res.status(200).json(getEmployee);
    } catch (error) {
        console.error("Error occured when getting Employee by id",error)
        res.status(500).json({error:error.message});
    }
}
export async function updateEmployee(req,res){
    try {
        const {EmployeeID}= req.params;
        const{PostID,FirstName,LastName,Gender,DateOfBirth,Email,PhoneNumber,Position,HiredDate,Salary,Status,Department,Address}= req.body;
        const employee= await Employee.findByPk(EmployeeID);
        if(!employee) return res.status(400).json("Employee Doesn't exist")
        const post= await Post.findByPk(PostID)
        if(!post) return res.status(400).json("post doesn't exist")
        const updatedEmployee= await employee.update({PostID,FirstName,LastName,Gender,DateOfBirth,Email,PhoneNumber,Position,HiredDate,Salary,Status,Department,Address})
        res.status(200).json(updatedEmployee);
    } catch (error) {
        console.error("error occured when updating Employee",error)
        res.status(500).json({error:error.message})
    }
}

export async function deleteEmployee(req,res){
    try {
        const {EmployeeID}= req.params;
        const employee= await Employee.findByPk(EmployeeID);
        if(!employee) return res.status(400).json("Employee doesn't exist");
        await employee.destroy()
        res.status(200).json("Deleted Employee successfully")
    } catch (error) {
        console.error("Error occured when deleting Employee",error)
        res.status(500).json({error:error.message})
    }
}