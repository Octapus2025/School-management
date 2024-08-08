import express from 'express';
import { con } from '../utils/db.js'; // Use named import
import bcrypt, { hash } from 'bcrypt'
import multer from "multer";
import path from "path";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post('/adminlogin', (req, res) => {
    const sql = "SELECT * FROM admin WHERE username = ? and password = ?";
    con.query(sql, [req.body.username, req.body.password], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" });
        if (result.length > 0) { // Fixed typo: "lenght" to "length"
            const username = result[0].username;
            const token = jwt.sign(
                { role: "admin", username: username },
                "jwt_secret_key",
                { expiresIn: "1d" }
            );
            res.cookie('token', token);
            return res.json({ loginStatus: true });
        } else {
            return res.json({ loginStatus: false, Error: "Wrong username or password" });
        }
    });
});

router.get('/state', (req,res)=>{
    const sql = "SELECT * FROM state";
    con.query(sql,(err,result)=>{
        if(err) return res.json({Status:false, Error:"Query Error"})
            return res.json({Status:true,Result:result})
    })
})

router.post('/add_state' , (req,res)=>{
    const sql = "INSERT INTO state ('name') VALUES (?)"
    con.query(sql, [req.body.state],(err, result) =>{
        if(err) return res.json({Status:false, Error:"Query Error"})
        return res.json({Status:true})
    })
})

//image upload
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'Public/Images')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fildname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage:storage
})

//end image upload

router.post('/add_student', upload.single('image'), (req, res) => {
    const sql = `INSERT INTO student (SN, AdmissionNo, Name, Class, Gender, state, image) VALUES (?)`;
    bcrypt.hash(req.body.AdmissionNo, 10, (err, hash) => {
        if (err) return res.json({ Status: false, Error: "Query Error0" });
        const values = [
            req.body.SN,
            hash,
            req.body.Name,
            req.body.Class,
            req.body.Gender,
            req.body.state,
            
            
            req.file.filename
        ];
        con.query(sql, [values], (err, result) => {
            if (err) return res.json({ Status: false, Error: err });
            return res.json({ Status: true });
        });
    });
});

router.get('/add_student', (req, res) => {
    const sql = "SELECT * FROM student";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true, Result: result });
    });
});

export { router as adminRouter };
