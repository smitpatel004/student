// const express = require('express')
import express from 'express'
const router = express.Router();
router.get("/",(req,res)=>{
    return res.render("home")
})
router.get("/add",(req,res)=>{
    return res.render("add");
});
// router.get("/login",(req,res)=>{
//     return res.render("login");
// });

// module.exports= router;
export default router;