import studentSchema from '../models/studentModels.js'

async function studentAdd(req,res){

    const{firstName,lastName,fatherName,motherName,std,grNo,dob,Cast,Religion,year

    }=req.body;
    await studentSchema.create({
        firstName,lastName,fatherName,motherName,std,grNo,dob,Cast,Religion,year
    });
    return res.render("home")

}
export default studentAdd;



