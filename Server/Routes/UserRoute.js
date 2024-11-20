// UserRoute.js
import express from 'express';
import { con } from '../utils/db.js';  // Corrected path
import multer from 'multer';
import jwt from 'jsonwebtoken';

const app = express();
const router = express.Router();



export { router as UserRouter };
