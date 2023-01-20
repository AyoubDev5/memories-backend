import User from '../models/user.js';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


// login user data
export  const login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const existUser =  await User.findOne({email});
        if(!existUser) 
            return res.status(404).json({message:"User doesn't exist!"});

        const passwordCorrect = await bcrypt.compare(password ,existUser.password);
        if(!passwordCorrect)
            return res.status(400).json({message:"Invalid credentials!"});
        
        const token = jwt.sign({email:existUser.email,id:existUser._id},'some secret here',{expiresIn:"1h"})

        res.status(200).json({result:existUser,token});
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

// create new user data
export  const register = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
   
    try {
        const existUser =  await User.findOne({email});
        if(existUser) 
            return res.status(400).json({message:"User already exist!"});
            
        if(password !== confirmPassword)
            return res.status(400).json({message:"Password don't match!"});
        
        const hash = await bcrypt.hash(password,12);

        const result = await User.create({email,password:hash,name:`${firstName} ${lastName}`});

        const token = jwt.sign({email:result.email,id:result._id},'test',{expiresIn:"1h"});

        res.status(200).json({result, token});
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}