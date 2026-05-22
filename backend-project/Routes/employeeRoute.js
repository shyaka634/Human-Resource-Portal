import express from "express";
import { insertEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee } from "../controllers/employeeController.js";
const employeeRouter= express.Router();
employeeRouter.post('/register', insertEmployee)
employeeRouter.get('/getAll', getAllEmployees)
employeeRouter.get('/:EmployeeID', getEmployeeById)
employeeRouter.put('/update/:EmployeeID', updateEmployee)
employeeRouter.delete('/delete/:EmployeeID', deleteEmployee)

export default employeeRouter;