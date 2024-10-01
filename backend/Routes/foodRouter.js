import express from 'express'
import { addFood, listfood, removeFood} from '../Controller/FoodController.js'
import { getProductById } from '../Controller/FoodController.js';
import multer from 'multer'
const  foodRouter = express.Router();


// Set up storage configuration
const storage = multer.diskStorage({            //diskStorage function is used to configure how and where files are saved on the server
    destination:"uploads",                       //All uploaded files will be saved in this "uploads" folder, If the folder doesn't exist,Multer can be configured to create it automatically.
    filename:(req,file,cb)=>{                    //determine the nameof the file that will be saved on the server
        return cb(null,`${Date.now()}${file.originalname}`)          //the function generates a unique filename using Date.now() 
    }
})


const upload = multer({storage: storage})

foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list",listfood)
foodRouter.post("/remove", removeFood)
foodRouter.get('/list/:id',getProductById)



export default foodRouter;

