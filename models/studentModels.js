
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
const MONGODB_URI=process.env.MONGODB_URI
mongoose.connect(MONGODB_URI).then(()=>console.log("MongoDB connected"))
.catch((err)=>console.log("MONGO ERROR",err));
const studentSchema=new mongoose.Schema({
    firstName:{type:String,
        require:true,
    },
    lastName:{
        type:String,
        require:true,
    },
    fatherName:{type:String,
        require:true,
    },
    motherName:{type:String,
        require:true,
    },
    std:{
        type:String,
        require:true,
    },
    grNo:{type:String,
        require:true,
    },
    dob:{type:Date,
        require:true,
    },
    Cast:{type:String,
        require:true,
    },
    Religion:{
        type:String,
        require:true,
    },
    year:{
        type:String,
        require:true,
    }
    


    

},{timestamps:true})
const student = mongoose.model("studentSchema",studentSchema)
export default student
