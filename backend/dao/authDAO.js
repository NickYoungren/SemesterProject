import { ObjectId } from "mongodb"
import User from "../models/User.js"
import bcrypt from "bcrypt"
import WebToken from "../utils/auth.js"
import jwt from "jsonwebtoken"

let users

export default class AuthDAO {

    static async injectDB(conn) {
        if (users) {
            return
        }
        try {
            users = await conn.db(process.env.PRODUCTS_NS).collection("users")
        } 
        catch(e) {
            console.error(`Unable to establish a collection handle in productsDAO: ${e}`)
        }
    }

    static signup = (req, res, next) => {
        let { name, email, password, password_confirmation } = req.body;
        users.findOne({email: email})
         .then(user=>{
            if(user){
                return res.status(422).json({ errors: [{ user: "email already exists" }] });
            }else {
               const user = new User({
                 name: name,
                 email: email,
                 password: password,
               });
               bcrypt.genSalt(10, function(err, salt) { bcrypt.hash(password, salt, function(err, hash) {
               if (err) throw err;
               user.password = hash;
               user.save()
                   .then(response => {
                      res.status(200).json({
                        success: true,
                        result: response
                      })
                   })
                   .catch(err => {
                    console.error(err)
                    console.log("b")
                     res.status(500).json({
                        errors: [{ error: err }]
                     });
                  });
               });
            });
           }
        }).catch(err =>{
            console.error(err)
            console.log("a")
            res.status(500).json({
              errors: [{ error: 'Something went wrong' }]
            });
        })
      }

    static signin = (req, res) => {
        let { email, password } = req.body;
        let errors = [];
        if (!email) {
          errors.push({ email: "required" });
        }
        if (!password) {
          errors.push({ password: "required" });
        }
        if (errors.length > 0) {
         return res.status(422).json({ errors: errors });
        }
        users.findOne({ email: email }).then(user => {
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
          let access_token = WebToken.createJWT(
             user.email,
             user._id,
             3600
          );
          jwt.verify(access_token, process.env.TOKEN_SECRET, (err,
   decoded) => {
            if (err) {
                console.error(err)
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
            console.error(err)
             res.status(500).json({ erros: err });
           });
         }
      }).catch(err => {
        console.error(err)
         res.status(500).json({ erros: err });
      });
      }

}
