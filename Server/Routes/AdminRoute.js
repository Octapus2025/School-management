import express from 'express';
import { con } from '../utils/db.js';
import multer from "multer";
import path from "path";
import jwt from "jsonwebtoken";

const app = express();

const router = express.Router();

// Admin login route
router.post('/adminlogin', (req, res) => {
    const sql = "SELECT * FROM admin WHERE username = ? AND password = ?";
    con.query(sql, [req.body.username, req.body.password], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" });
        if (result.length > 0) {
            const username = result[0].username;
            const token = jwt.sign({ role: "admin", username: username }, "jwt_secret_key", { expiresIn: "1d" });
            res.cookie('token', token);
            return res.json({ loginStatus: true });
        } else {
            return res.json({ loginStatus: false, Error: "Wrong username or password" });
        }
    });
});

// Multer storage for image upload
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req,file,cb) =>{
        cb(null,file.fieldname + '-'+ Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

app.post('/upload',upload.single('image'),(req,res)=>{
    res.send(`File uplaod at ${req.file.path}`);
});

// Add student route
router.post('/add_student', upload.single('image'), (req, res) => {
    const { sn, admissionno, studentname, class: studentClass, gender, city } = req.body;
    const image = req.file ? req.file.filename : 'default-image.jpg';

    if (!admissionno || !studentname || !studentClass || !gender || !city) {
        return res.json({ Status: false, Error: "Missing required fields" });
    }

    const sql = `INSERT INTO student (SN, AdmissionNo, Name, Class, Gender, city, image) VALUES (?)`;
    const values = [sn, admissionno, studentname, studentClass, gender, city, image];

    con.query(sql, [values], (err, result) => {
        if (err) return res.json({ Status: false, Error: err.message });
        return res.json({ Status: true });
    });
});

// Get all students
router.get('/student', (req, res) => {
    const sql = "SELECT * FROM student";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true, Result: result });
    });
});

router.get('/student/:sn',(req,res)=>{
    const sn = req.params.sn;
    const sql = "SELECT * FROM student WHERE SN =?";
    con.query(sql,[sn] ,(err, result) => {
        if (err) return res.json({Status:false, Error})
        return res.json({Status:true,Result:result})
    })
})

//Get students by StudentForm
router.get('/studentform',(req,res) =>{
    const StudentForm = req.query.StudentForm;
    const sql = "SELECT * FROM student WHERE SN=?";
    con.query(sql,[StudentForm] ,(err, result) => {
        if (err) return res.json({Status:false, Error:"Query Error"})
            return res.json({Status:true,Result:result});
    });
});

//Get students by class 
router.get('/student_class',(req,res)=>{
    const className = req.query.Class;
    const sql = "SELECT * FROM student WHERE Class =?";
    con.query(sql,[className],(err,result)=>{
        if (err) return res.json({Status:false,Error:"Query Error"});
        return res.json({Status:true, Result:result});
    });
});



// Update student route
router.put('/edit_student/:sn', (req, res) => {
    const sn = req.params.sn;
    const { AdmissionNo, Name, Class, Gender, city } = req.body;
    const sql = `UPDATE student SET AdmissionNo = ?, Name = ?, Class = ?, Gender = ?, city = ? WHERE sn = ?`;
    const values = [AdmissionNo, Name, Class, Gender, city, sn];

    con.query(sql, values, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true, Result: result });
    });
});

//Delete student Route
router.delete('/delete_student/:sn', (req, res) => {
    const sn = req.params.sn;
    const sql = `DELETE FROM student WHERE sn = ?`; // Only need `sn` to delete
    con.query(sql, [sn], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true, Result: result });
    });
});

// Add staff route
router.post('/add_staff', upload.single('image'), (req, res) => {
    const { id, teachername, email, contactnumber, dob, gender, city, subject, educationalqualification, university, description, nic, joindate } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!teachername || !email || !contactnumber || !gender || !subject) {
        return res.json({ Status: false, Error: "Missing required fields" });
    }

    const sql = `INSERT INTO staff (id, teacher_name, email, contactnumber, dob, gender, city, subject, educationqualification, university, description, nic, joindate, image) VALUES (?)`;
    const values = [id, teachername, email, contactnumber, dob, gender, city, subject, educationalqualification, university, description, nic, joindate, image];

    con.query(sql, [values], (err, result) => {
        if (err) return res.json({ Status: false, Error: err.message });
        return res.json({ Status: true });
    });
});



// Get all staff
router.get('/staff', (req, res) => {
    const sql = "SELECT * FROM staff";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true, Result: result });
    });
});

export { router as adminRouter };
