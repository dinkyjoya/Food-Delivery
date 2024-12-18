import jwt from 'jsonwebtoken'

const authMiddleWare= async(req, res, next)=>{
const {token} = req.headers;
if(!token){
return res.json({success:false, message:"Not Authorized login again"})
}
try {
    const token_decode = jwt.verify(token,process.env.JWT_SECRET);
    req.body.userId = token_decode.id;            //this middleware take the token and  convert that into userId
    next();
} catch (error) {
    console.log("error", error);
    res.json({success: false, message:"error"})
}
}

export default authMiddleWare