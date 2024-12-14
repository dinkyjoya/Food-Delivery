import userModel from "../Models/UserModel.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import validator from "validator";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "dimplejoya2@gmail.com",
    pass: "snkzbonylxacoueh",
  },
});




const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login password", password);

  try {
    const user = await userModel.findOne({ email });
    console.log(user)

    if (!user) {
      return res
        .status(404)
        .json({success:false, message: "user does not exist/user not found" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res
        .status(400)
        .json({success:false, message: "Wrong password/password deos not match" });
    }

    const token = createToken(user._id);
  return  res.json({success:true,message:"Login Successfully", token})

  } catch (error) {
  return  res.status(500).json({
      error: error.message,
      message: "Something went wrong",
      success: false,
    });
  }
};


const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};


const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  let otp = Math.floor(Math.random() * 1000000);
  try {
   
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Please enter strong password",
      });
    }

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const securepassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name: name,
      email: email,
      password: securepassword,
      otp,
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    res.cookie("userToken", token, {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
    });

     

    await transporter.sendMail({
      from: "dimplejoya2@gmail.com",
      to: email,
      subject: "OTP Verification",
      html: `<h1>your Otp is ${otp}</h1>`,
    });
    console.log("Sending OTP to:", email);

   
  res.json({success:true, token});
   return res.status(200).json({
      success: true,
      message: "User registered successfully",
      token,
    });



  } catch (error) {
  return  res.status(500).json({
      error: error.message,
      message: "Something went wrong",
      success: false,
    });
  }
};


const verifyUser = async(req, res)=>{
  const {email,otp} = req.body;
  try {
    const user = await userModel.findOne({email});

    if(!user){
     return res.status(404).json({message:"User NOt Found/ User not registerd"});
    
    }
    console.log("Generated OTP:", otp);

    if(user.otp == otp.toString()){
      user.isVerified = true;
      user.otp= null;
    await user.save();
    return  res.status(200).json({success:true, message:"User verified successfully"})
    }else{
      return res.status(200).json({ message: "Invalid OTP" });

    }
  } catch (error) {
  return  res.status(500).json({
      error: error.message,
      message: "Something went wrong",
      success: false,
    });
  }
}


export { loginUser, registerUser,verifyUser };
