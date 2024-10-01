import express from 'express'
import { loginUser, registerUser, verifyUser } from '../Controller/UserController.js'

const UserRouter = express.Router()

UserRouter.post("/register", registerUser)
UserRouter.post("/login", loginUser)
UserRouter.post("/verify", verifyUser)
               //http://localhost:8000/api/user/order

export default UserRouter; 