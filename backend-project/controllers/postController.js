import Post from "../models/postModel.js";

export async function insertPost(req,res){
    try {
        const {PostName}=req.body
        const findPost= await Post.findOne({where:{PostName}})
        if(findPost) return res.status(400).json("Post Already exists");
        const post= await Post.create({PostName})
        res.status(201).json(post)
    } catch (error) {
        console.error("error occured when inserting post")
        res.status(500).json({error:error.message})
    }
}

export async function getAllPost(req,res){
    try {
        const post= await Post.findAll()
        if(!post) return res.status(400).json("Post Doesn't exist")
        res.status(200).json(post)
    } catch (error) {
        console.error("Error occured when getting all posts",error)
        res.status(500).json({error:error.message})
    }
}