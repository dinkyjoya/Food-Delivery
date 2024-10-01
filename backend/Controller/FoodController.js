
import foodModel from '../Models/foodModel.js';
import fs from 'fs'

//add food item
const addFood=async(req, res)=>{
 let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })
    try {
        await food.save();
        res.json({success:true,message:"Food added"})
    }catch (error) {
        console.log("Error while adding food:", error);
        res.status(500).json({ success: false, message: "Error while adding food", error: error.message });
    }
}

//all food list
const listfood = async(req, res)=>{
try {
    const response = await foodModel.find({});
     res.json({success: true, data: response})
} catch (error) {
    console.log(error);
    res.json({success:false, messahe:"Error"})
}
}

//remove food item
const removeFood = async(req, res)=>{
try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, ()=>{})

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({success:true, message:"food removed successfully"})

} catch (error) {
    console.log(error);
    res.json({success: false, message:"Error"});
}
}

const getProductById = async(req, res)=>{
    try {
        const singleFood = await foodModel.findById(req.params.id);
        if(!singleFood){
            return res.status(404).json({success: false,message:"Food not found"});
        }
        res.json({ success: true, singleFood });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}



export {addFood, listfood, removeFood, getProductById}