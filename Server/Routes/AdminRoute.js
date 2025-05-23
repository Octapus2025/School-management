import express from 'express';
import { con } from '../utils/db.js';
import multer from "multer";
import path from "path";
import jwt from 'jsonwebtoken';
import { count, error } from 'console';
import { fileURLToPath } from 'url';

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
            res.cookie('token', token,{httpOnly:true});
            return res.json({ loginStatus: true,token:token });
        } else {
            return res.json({ loginStatus: false, Error: "Wrong username or password" });
        }
    });
});

//Define __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer storage for image upload
const storage = multer.diskStorage({
    destination: path.join(__dirname,'uploads'),
    filename: (req,file,cb) =>{
        cb(null,file.fieldname + '-'+ Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage:storage });

//Server static files from the uploads directory
app.use('/Images', express.static(path.join(__dirname, 'Images')));


app.post('/upload',upload.single('image'),(req,res)=>{
    res.send(`File uplaod at ${req.file.path}`);
});

// Add student route
router.post('/add_student', upload.single('image'), (req, res) => {
    const {  admissionno, studentname,parentsname,parentscontactnumber,homeaddress ,class: studentClass, gender, city,username,password } = req.body;
    const image = req.file ? req.file.filename : 'default-image.png';

    if (!admissionno || !studentname || !studentClass || !gender || !city) {
        return res.json({ Status: false, Error: "Missing required fields" });
    }

    const sql = `INSERT INTO student ( AdmissionNo, Name, ParentsName,ParentsContactNumber,HomeAddress,Class, Gender, city, UserName,Password,image) VALUES (?)`;
    const values = [ admissionno, studentname, parentsname,parentscontactnumber,homeaddress,studentClass, gender, city,username,password, image];

    con.query(sql, [values], (err, result) => {
        if (err) return res.json({ Status: false, Error: err.message });
        return res.json({ Status: true });
    });
});
  

//Fetch payment details for a specific student
router.get('/student/:admissonno/payments',(res,req)=>{
    const {admissionNo} = req.params;
    db.query('SELECT * FROM student_payments WHERE student_admisson_no = ?',[admissionNo],(err,results)=>{
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

//Update payment for a specific term
router.post('/student/:admissonno/payments',(req,res)=>{
    const {admissionNo} = req.params;
    const {term,amountPaid}= req.body;

    //Fetch current payment record 
    db.query('SELECT * FROM student_payments WHERE student_admission_no = ? AND term = ?',[admissionNo,term],(err,results)=>{
        if (err) return res.status(500).json(err);
        if (results.length === 0) return res.status(404).json({message: 'Payment record not found'});

        const payment = results[0];
        const newAmountPaid = payment.amount_paid + amountPaid;
        const status = newAmountPaid >= payment.amount_due ? 'Paid':'Unpaid' ;

        db.query('UPDATE student_payments SET amount_paid=?,status = ?, WHERE admissionno =?',[newAmountPaid,status,payment.admissionNo],(err)=>{
           if(err) return res.status(500).json(err);
           res.json({message:'Payment updated successfully',status}); 
        });
    });
});

//Post Noticec
router.post('/add_notice', async (req, res) => {
    const { AdmissionNo, NoticeText } = req.body;
    const sql = `INSERT INTO notices (AdmissionNo, NoticeText) VALUES (?, ?)`;
    con.query(sql, [AdmissionNo, NoticeText], (err, result) => {
        if (err) {
            console.error("Database Error:", err);  // Log error details
            return res.json({ Status: false, Error: err });
        }
        res.json({ Status: true, Result: result });
    });
});



//get all notice
router.get('/notices',(req,res)=>{
    const sql = "SELECT * FROM notices";
    con.query(sql,(err,result)=>{
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true, Result: result });
    })
})

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


//Get students Details by View
router.get('/student_admissonno',(req,res) =>{
    const admissionno = req.query.AdmissionNo;
    const sql = "SELECT * FROM student WHERE AdmissionNo =?";
    con.query(sql,[admissionno],(err,result)=>{
        if(err) return res.json({Status:false,Error:"Query Error"});
        console.log(result);
        return res.json({Status:true,Result:result});
    })
})


// Update student route
router.put('/edit_student/:admissionno', (req, res) => {
    const admissionno = req.params.admissionno;
    const { Name,ParentsName,ParentsContactNumber,Class, Gender, city } = req.body;
    const sql = `UPDATE student SET  Name = ?, ParentsName  =?, ParentsContactNumber = ?, Class = ?, Gender = ?, city = ? WHERE AdmissionNo = ? `;
    const values = [  Name,ParentsName,ParentsContactNumber,Class, Gender, city,admissionno];


    con.query(sql, values, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true, Result: result });
    });
});

//Delete student Route
router.delete('/delete_student/:admissionno', (req, res) => {
    const admissonno = req.params.admissionno;
    const sql = `DELETE FROM student WHERE admissionno = ?`; // Only need `sn` to delete
    con.query(sql, [admissonno], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true, Result: result });
    });
});

// Add staff route
router.post('/add_staff', upload.single('image'), (req, res) => {
    const { id, teachername, email, contactnumber, dob, gender, city, subject, education:educationalqualification, university, description, nic, joindate } = req.body;
    const image = req.file ? req.file.filename : 'default.png';

    //Validate required fields, including
    if (!teachername || !email || !contactnumber || !gender || !subject) {
        return res.json({ Status: false, Error: "Missing required fields" });
    }

    //Sql query to insert data into the `staff` table
    const sql = `INSERT INTO staff (id, teacher_name, email, contactnumber, dob, gender, city, subject, educationqualification, university, description, nic, joindate, image) VALUES (?)`;
    const values = [id, teachername, email, contactnumber, dob, gender, city, subject, educationalqualification, university, description, nic, joindate, image];

    con.query(sql, [values], (err, result) => {
        if (err) return res.json({ Status: false, Error: err.message });
        return res.json({ Status: true });
    });
});

//Update staff route
router.put('/edit_staff/:id',(req,res) => {
    const id = req.params.id;
    const {  teachername, email, contactnumber, dob, gender, city, subject, education:educationalqualification, university, description, nic } = req.body;
    const sql = `UPDATE staff SET teacher_name= ?, email = ?, contactnumber = ? , dob = ?, gender = ? , city = ?, subject = ? , educationqualification = ?, university = ? , description = ? , nic = ? WHERE id = ?`;
    const values = [teachername , email , contactnumber , dob , gender , city , subject , educationalqualification , university , description , nic, id];

    con.query(sql,values,(err,result)=>{
        if (err) return res.json({Status:false, Error:"Query Error"});
        return res.json({Status:true,Result:result});
    });
});


//Delete staff Route
router.delete('/delete_staff/:id',(req,res) =>{
    const id = req.params.id;
    const sql = `DELETE FROM staff WHERE id = ?`;//Only need `id` to delete
    con.query(sql,[id],(err,result)=>{
        if (err) return res.json({Status:false, Error:"Query Error"});
        return res.json({Status: true, Result:result})
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

// Parents Route
router.post('/parentslogin', (req, res) => {
    const sql = "SELECT * FROM student WHERE AdmissionNo = ? AND UserName = ? AND Password = ?";
    con.query(sql, [req.body.AdmissionNo, req.body.UserName, req.body.Password], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" });
        
        if (result.length > 0) {
            const UserName = result[0].UserName;
            const token = jwt.sign({ role: "user", UserName: UserName }, "jwt_secret_key", { expiresIn: "1d" });
            res.cookie('token', token, { httpOnly: true });
            return res.json({ loginStatus: true, token: token });
        } else {
            return res.json({ loginStatus: false, Error: "Wrong username or password" });
        }
    });
});

//Set the student count
router.get('/studentcount', async (req, res) => {
    try {
        const studentcount = await db.query('SELECT COUNT(*) AS count FROM student');
        res.json({ count: studentcount[0].count }); // Fix: Ensure proper JSON format
    } catch (error) {
        console.error('Error fetching student count:', error);
        res.status(500).json({ message: 'Error fetching student count' });
    }
});


export { router as adminRouter };
