import  mongoose  from 'mongoose';
import PostMessage from '../models/postMessage.js'

//logic for reading the posts 
export const getPosts = async (req , res) => { 
    try{
      const postMessages = await PostMessage.find(); 
      

      res.status(200).json(postMessages); 
    } catch (error){
     res.status(403).json({message: error.message});
    }
}; 


//logic for creating posts
export const createPost = async (req, res) => { 
    const post = req?.body; 
    
    const newPost = new PostMessage(post); 
    try{
        await newPost.save(); 

        res.status(201).json(newPost);

    } catch(error){
       res.status(405).json({message: error.message });
    }
}

//Logic for updating posts 
export const updatePost = async (req, res) => {
 
     const {id: _id} = req.params; 
     const post  = req?.body; 

     if(!mongoose.Types.ObjectId.isValid(_id))
     return res.status(404).send("Found No posts with that id"); 
     
     const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post , _id} , {new: true}); 
    
    res.json(updatedPost);
}

//Logic for deleting posts 
export const deletePost = async (req, res) => {
 
    const {id} = req.params; 
    const post  = req?.body; 

    if(!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Found No posts with that id"); 
    
    const updatedPost = await PostMessage.findByIdAndRemove(id); 
   
   res.status(201).json({message: "Post deleted Successfully."}); 
   
} 

//Logic for liking posts
export const likePost = async (req, res) => {
     
    const {id} = req.params; 
   
    if(!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Found No posts with that id"); 
    
    const post = await PostMessage.findById(id);  
    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1} , {new: true}); 
  
    res.status(202).json(updatedPost); 
    
}