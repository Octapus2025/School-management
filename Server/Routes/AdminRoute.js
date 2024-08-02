import express from 'express';
import { con } from '../utils/db.js'; // Use named import

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

export { router as adminRouter };
