import express from 'express'
import studentAdd from '../controllers/studentControllers.js';
const router = express.Router();
router.post('/',studentAdd)
export default router;