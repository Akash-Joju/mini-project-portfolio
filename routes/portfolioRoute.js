const router= require('express').Router();
const {Intro, About, Project, Contact, Experience, Left}= require('../models/portfolioModel');





//get portfolio data
router.get('/get-portfolio-data', async(req,res)=>{

    try{
        const intros= await Intro.find();
        const abouts= await About.find();
        const projects= await Project.find();
        const contacts= await Contact.find();
        const experiences= await Experience.find();
        const sidebars=await Left.find();
        res.status(200).send({
            intro:intros[0],
            about:abouts[0],
            projects:projects,
            contact:contacts[0],
            experiences: experiences,
            left:sidebars[0],
    })
    }
    catch(error){
        res.status(500).send(error);
    }
});

//update intro
router.post("/update-intro",async (req,res)=>{
    try {
        const intro = await Intro.findOneAndUpdate(
            {_id:req.body._id},
            req.body,
            {new:true}
        );
    res.status(200).send({
        data:intro,
        success: true,
        message : "Intro updated successfully"
    });
}
catch(error) {
    res.status(500).send(error);
}
});

//update about
router.post("/update-about",async (req,res)=>{
    try {
        const about = await About.findOneAndUpdate(
            {_id:req.body._id},
            req.body,
            {new:true}
        );
    res.status(200).send({
        data:about,
        success: true,
        message : "About updated successfully"
    });
}
catch(error) {
    res.status(500).send(error);
}
});

//update sidebar link
router.post("/update-left",async (req,res)=>{
    try {
        const left = await Left.findOneAndUpdate(
            {_id:req.body._id},
            req.body,
            {new:true}
        );
    res.status(200).send({
        data:left,
        success: true,
        message : "Sidebar links updated successfully"
    });
}
catch(error) {
    res.status(500).send(error);
}
});

//update contacts
router.post("/update-contact",async (req,res)=>{
    try {
        const contact = await Contact.findOneAndUpdate(
            {_id:req.body._id},
            req.body,
            {new:true}
        );
    res.status(200).send({
        data:contact,
        success: true,
        message : "Sidebar links updated successfully"
    });
}
catch(error) {
    res.status(500).send(error);
}
});

//add experience

router.post("/add-experience",async(req,res)=>{
    try{
        const experience= new Experience(req.body);
        await experience.save();
        res.status(200).send({
            data:experience,
            success:true,
            message:"Experience added successfully",
        });
    }
    catch(error) {
        res.status(500).send(error);
    }
});





module.exports=router;