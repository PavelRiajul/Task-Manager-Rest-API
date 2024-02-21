const TasksModel = require("../models/TasksModel");

//* createTask --- user er task create korar jonno amra akta rest api create korlam
exports.createTask= async(req,res)=>{

    try{
        let reqBody=req.body  //  title, description, status -- amra request er body te pabo. postman 
        //theke    asbe ae golo
        reqBody.email=req.headers['email'];  //// email address ta peyesi token decode kore header theke.
        let result = await TasksModel.create(reqBody)
        res.status(200).json({status:"success",data:result})
    }
    catch(e){
        res.status(200).json({status:"fail",data:e})
    }
    
}


//*deleteTask ---- user er task delete korar jonno amra akta api banalam
exports.deleteTask= async(req,res)=>{
   
   try{
    let id= req.params.id; // req er params a jei task ta amra delete korte chacchi sei task er id dore delete korbo.
    let Query={_id:id};
    let result = await TasksModel.deleteOne(Query);
    res.status(200).json({status:"success",data:result})
   }
   catch(e){
    res.status(200).json({status:"fail",data:e})
   }
    
}


//* updatetaskStatus ---- user er  status update korar jonno amra api banalam
exports.updateTaskStatus=async(req,res)=>{

    try{
        let id= req.params.id; // kon task ta update jorbo setar akta id lagbe
        let status= req.params.status;  // ami status ta ke update korte chacchi update body theke o kora jai
      //abar url theke o kora jai. ami url theke korbo
        let Query={_id:id};
        let reqBody={status:status}
        let result = await TasksModel.updateOne(Query,reqBody)// 2 ta parameter 1-> kon data ta ke update korbe . jekhane id sathe id match korbe sei data ta ke update korbe  2->  updated je data ta jabe 
        res.status(200).json({status:"success",data:result})
    }
    catch(e){
        res.status(200).json({status:"fail",data:e})
    }
}


//* listTaskByStatus ---- 
// akhon status dore dore task er akta list chai amra.
exports.listTaskByStatus=async(req,res)=>{

    try{
        let status= req.params.status;
        let email=req.headers['email'];
        let result = await TasksModel.find({email:email,status:status}) // 2ta sorter maddome find korbo. 1-> email address. jei email ta peye hai header a peye jai Token er maddome.  2-> status: jei status ami pathacchi ami url parameter er maddome.
        res.status(200).json({status:"success",data:result})
    }
    catch(e){
        res.status(200).json({status:"fail",data:e})
    }

}


//* taskStatusCount  --- user er dashbord a counting samary er jonno amra aro akta api banalam.
//task er status count kora mins -- amader new koita ase, amader completed koita ase. amra segolo ke count korte chai. gonona korte chai.
// count korte gele aekhane akto aggregation korte hobe. aekhane simple query deye hobe na.
//Jokhon kono complex task a jabo. ba complex a calculation a jabo. you need to aggregation
exports.taskStatusCount=async(req,res)=>{
    try{
        let email=req.headers['email'];
        let result = await TasksModel.aggregate([
            {$match:{email:email}}, // aekhane akta matching status create korte hobe. karon ak user er status to arek user ke debo na.
        //specific jei  email address er condition amra dicchi , oi  user er data golo neyee sodo amader counting ta ashbe.
        //* akhon countin ta je amader hobe , sei counting ta ke amader korte hobe ki new koto golo, completed koto golo, cencel koto golo , segolo neye amader (groping) korte hobe.aggregate pipe line er bitore group akta operator ae ta deye group bittik gonona korte pari.
      {$group:{_id:"$status",sum:{$count:{}}}}  // groping korbo status column er opor bitti kore.tarpor sum deye mongodb er count operator use korbo
      ])
      res.status(200).json({status:"success",data:result}) 
    }
    catch(e){
        res.status(200).json({status:"fail",data:e})
    }

}


