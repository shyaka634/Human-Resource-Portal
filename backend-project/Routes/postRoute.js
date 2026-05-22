import express from "express";
import { insertPost , getAllPost} from "../controllers/postController.js";
const postRouter= express.Router();
postRouter.post('/register', insertPost);
postRouter.get('/getAll', getAllPost);

export default postRouter;