//this file is built for cartData in the mongodb
import userModel from "../Models/UserModel.js";

//add items
const addToCart = async(req, res)=>{
try {
    let userData = await userModel.findById(req.body.userId)       //here we have find that token converted userId, this middleware convrt the token in to userId
    let cartData = await userData.cartData;
    if(!cartData[req.body.itemId]){
        cartData[req.body.itemId]  =1;
    }else{
        cartData[req.body.itemId] +=1;
    }
    console.log("CartData before update:", cartData);

    await userModel.findByIdAndUpdate(req.body.userId,{cartData},{new:true});          //this will update the catdata in the database
    console.log("CartData successfully updated in the database.");

    res.json({success:true, message:"Added to Cart"})
} catch (error) {
    console.log(error);
    res.json({success:false, message:"Error"})
}
}

//removeFromCart
const removeFromCart = async(req, res)=>{
    try {
       let userData = await userModel.findById(req.body.userId);
       let cartData = await userData.cartData;
       if(cartData[req.body.itemId] >0){
               cartData[req.body.itemId] -= 1;
       }
       await userModel.findByIdAndUpdate(req.body.userId,{cartData});
       res.json({success:true, message:"Removed from Cart"});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
    }
}

//fetch the users cart data
const getCart = async(req, res)=>{
   try {
    let userData =  await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
   res.json({success:true, cartData})
   } catch (error) {
    console.log(error)
    res.json({success: false, message:"error"})
   } 
}

// const removeAllFromCart = async (req, res) => {
//     try {
//       let userData = await userModel.findById(req.body.userId);
//       if (!userData) {
//         return res.status(404).json({ success: false, message: "User not found" });
//       }
//       let cartData = {};
//       await userModel.findByIdAndUpdate(req.body.userId, { cartData });
//       res.json({ success: true, message: "Cart cleared successfully" });
//     } catch (error) {
//       console.error(error);
//       res.json({ success: false, message: "Error clearing cart" });
//     }
//   };
  

export {addToCart, removeFromCart, getCart}