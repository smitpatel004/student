import express from 'express'
// import mongoose from 'mongoose'
import dotenv from "dotenv"
import staticRoute from './routes/staticRouter.js'
import studentRouter from './routes/studentRouter.js'
import studentSchema from './models/studentModels.js'
const app=express()
dotenv.config()
const PORT =process.env.PORT;
app.use(express.json())
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:false}));
app.use("/",staticRoute);
app.use("/student",studentRouter);

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
// app.get('/about',(req,res)=>{
//     res.send('about page')
// })


app.get("/student", async (req, res) => {
    const { search, filterBy } = req.query;
    let query = {};

    if (search) {
        query[filterBy] = { $regex: search, $options: "i" }; // Case-insensitive search
    }

    const alldbuser = await studentSchema.find(query);
    res.render("students", { alldbuser, search, filterBy });
});

app.delete("/student/delete/:id", async (req, res) => {
    try {
        await studentSchema.findByIdAndDelete(req.params.id);
        res.sendStatus(200);
    } catch (error) {
        console.error("Error deleting student:", error);
        res.status(500).send("Internal Server Error");
    }
});
app.get("/student/edit/:id", async (req, res) => {
    try {
        const student = await studentSchema.findById(req.params.id).lean();
        res.render("editStudent", { student });
    } catch (error) {
        console.error("Error fetching student for edit:", error);
        res.status(500).send("Internal Server Error");
    }
});
app.post("/student/update/:id", async (req, res) => {
    try {
        await studentSchema.findByIdAndUpdate(req.params.id, req.body);
        res.redirect("/student"); // Redirect back to student list
    } catch (error) {
        console.error("Error updating student:", error);
        res.status(500).send("Internal Server Error");
    }
});



app.use(express.static("public"));
// app.get("/student", async (req, res) => {
//     const { year, search } = req.query;

//     let query = {}; // Initialize empty query

//     // If year is provided and not "All", filter by year
//     if (year && year !== "All") {
//         query.year = year;
//     }

//     // If search is provided, filter by multiple fields using regex for partial match
//     if (search) {
//         console.log("IN SEARCH _________________");
        
//         // Ensure both year and search are correctly applied
//         query.$and = [
//             { year: year !== "All" ? year : { $exists: true } }, // Keep all if "All" is selected
//             {
//                 $or: [
//                     { firstName: { $regex: search, $options: "i" } },
//                     { lastName: { $regex: search, $options: "i" } },
//                     { Cast: { $regex: search, $options: "i" } },
//                     { Religion: { $regex: search, $options: "i" } }
//                 ]
//             }
//         ];
//     }

//     try {
//         const students = await studentSchema.find(query).lean(); // Fetch students
//         console.log("students", students);

//         const years = await studentSchema.distinct("year"); // Get unique years
//         console.log("YEARS", years);

//         if (req.xhr) {  // If request is AJAX, return JSON
//             return res.json(students);
//         }

//         res.render("student", { students, years, selectedYear: year || "All", searchQuery: search || "" });
//     } catch (error) {
//         console.error("Error fetching students:", error);
//         res.status(500).send("Internal Server Error");
//     }
// });




app.listen(PORT,()=>{
    console.log(`Example app listening on port ${PORT}`)
})