const validateRegistration = (req,res,next) =>{
    const {username,password} = req.body;
    if (!username || !password){
         res.status(404).json({message:'Enter correct username and password'});
    }
    if(password.length >=8 ){
        next();
    }else{
         res.status(402).json({message:'password must contain atleast 8 digits'});
    }
};
const validateLogin = (req,res,next) => {
    const {username,password} = req.body;
    if(!username || !password) {
        res.status(400).json({message:'username and password is required'});
    }
    next();
};
module.exports ={validateRegistration,validateLogin};