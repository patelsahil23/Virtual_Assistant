 import express from "express"
import { Login, logOut, signUP } from "../controllers/auth.controllers.js"


 const authRouter = express.Router()


authRouter.post("/signup",signUP)
authRouter.post("/signin",Login)
authRouter.get("/Logout",logOut)



 export default authRouter