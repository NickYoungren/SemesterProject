import User from "../models/User.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import JWT from "../utils/auth.js";
import AuthDAO from "../dao/authDAO.js";
const createJWT = JWT.createJWT

export default class AuthController{
   static async signup(req, res, next){
      try{
          AuthDAO.signup(req)
          res.json({status: "success"})
      }
      catch(e) {
          res.status(500).json({error: e.message})
      }
  }

    static signin = (req, res) => {
        let { email, password } = req.body;
        User.findOne({ email: email }).then(user => {
          if (!user) {
            return res.status(404).json({
              errors: [{ user: "not found" }],
            });
          } else {
             bcrypt.compare(password, user.password).then(isMatch => {
                if (!isMatch) {
                 return res.status(400).json({ errors: [{ password:
   "incorrect" }] 
                 });
                }
          let access_token = createJWT(
            user.email,
            user._id,
            3600
          );
          jwt.verify(access_token, process.env.TOKEN_SECRET, (err,
   decoded) => {
            if (err) {
               res.status(500).json({ erros: err });
            }
            if (decoded) {
                return res.status(200).json({
                   success: true,
                   token: access_token,
                   message: user
                });
              }
            });
           }).catch(err => {
             res.status(500).json({ erros: err });
           });
         }
      }).catch(err => {
         res.status(500).json({ erros: err });
      });
   }
}