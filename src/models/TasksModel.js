const  mongoose=require('mongoose');
const DataSchema=mongoose.Schema({
    title:{type:String},
    description:{type:String},
    status:{type:String},
    email:{type:String},// email ta kinto amra user er kaj theke frontend theke nebo na.frontend theke jodi amra kono user er identiti neye  ashe setake Backend a use kori plaintext akare. seikhetre kinto software er security bolte kiso thakbe na. email address ta ke kinto amra user er identit dore kaj kortesi.email address amar uniq. amra jokhon user create kori tokono kinto amra email address ta uniq kore desi. oi email address tai hocche amar aekhane user er porichoi.ba user er identiti.
    //jokhon amra konouser er identiti neye kaj korbo, oi email address ta ke amra token create korar somoy oi user er email address ta ke oi token er bitore rekhe deyesi . and oi token er bitore theke neye neye oi user er email address ta amra use korbo. 
    //jodi frontend theke plantaxt akake user er email address ta neye neye amra kaj kori , tahole ak user arek user er email address ta temparing kore ak user arek user er data delete kore debe.ba ak user arek user er data dekhe felbe.
    //ae jonno amra email address take jokhon header a patheye dicchi  amra authverymiddleware a oi token ta ke decode kore  email address ta ke amra header a suplay kore deyesi.jokhon suplay korlam email address ta kinto request er header a sob somoy pacchi.
},{timestamps: true,versionKey:false});
const TasksModel=mongoose.model('tasks',DataSchema);
module.exports=TasksModel


