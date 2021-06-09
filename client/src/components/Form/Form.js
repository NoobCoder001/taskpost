
import React , { useState , useEffect } from 'react'; 
import { TextField , Button , Typography , Paper } from '@material-ui/core';  
import { useDispatch } from 'react-redux';  



import useStyles from './styles'; 
import { createPost ,updatePost } from '../../actions/posts';
import { useSelector }  from 'react-redux'; 



//Get the current Id of the post 


const Form = ({currentId , setCurrentId}) => { 
    const [postData , setPostData] = useState({creator: '',title:'', message:'', tags:''}); 
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    
    const classes = useStyles(); 
    const dispatch = useDispatch(); 

    useEffect(() => {
      if(post) 
      setPostData(post); 

    }, [post])


    const handleSubmit = (e) => { 
          e.preventDefault();  
            console.log(postData); 
          
          if(currentId){
            dispatch(updatePost(currentId, postData));
          }else{
            dispatch(createPost(postData));
          }
          
          clear();
    }
    
    const clear = () => { 
         setCurrentId(null); 
         setPostData({creator: '',title:'', message:'', tags:''});
    }

    return ( 
        <Paper className={classes.paper}> 
        <form autoComplete='off' className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} noValidate> 
        <Typography varient="h6">{currentId ? 'Editing' : 'Creating'} a post</Typography> 
        <TextField name="creator" label="Creator"  fullWidth value={postData.creator}  
        onChange={(e) => setPostData({...postData, creator: e.target.value })} 
        />
        <TextField name="title"  label="Title"  fullWidth value={postData.title} 
         onChange={(e) => setPostData({...postData, title: e.target.value })} 
        />
        <TextField name="message" label="Message"  fullWidth value={postData.message}  
        onChange={(e) => setPostData({...postData, message: e.target.value })} 
        />
        <TextField name="tags" label="Tags"  fullWidth value={postData.tags}  
        onChange={(e) => setPostData({...postData, tags: e.target.value.split(',') })} 
        /> 
        <Button className={classes.buttonSubmit} varient="contained" color="primary" size="large" type="submit" fullWidth 
        onSubmit={handleSubmit}> 
        Submit
        </Button>
        
        <Button className={classes.buttonSubmit} varient="contained" color="secondary" size="small" 
        onClick={clear} fullWidth> 
        Clear
        </Button>
        </form> 
        </Paper>
    );
}

export default Form; 