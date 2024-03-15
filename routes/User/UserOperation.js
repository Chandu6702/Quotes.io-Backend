import User from '../../database/schema/UserSchema.js';
import bcrypt from 'bcrypt'

async function userSignup(email,password){
    try{
        const hash=bcrypt.hashSync(password,10);
        await User.insertMany({email:email,password:hash});
        return {status:true};
    }catch(error){
        return {status:false,error:error.message};
    }
}

async function userLogin(email,password){
    try{
        const user=await User.findOne({email:email});

        if(user==null)
            return {status:false,error:"User not Found"};

        if(!bcrypt.compareSync(password,user.password))
            return {status:false,error:"Incorrect Password"};

        return {status:true};
    }catch(error){
        return {status:false,error:error.message};
    }
}

export {userLogin,userSignup};