const  mongoose=require('mongoose');
const OTPSchema=mongoose.Schema({
    email:{type:String},
    otp:{type:String},
    status:{type:Number,default:0}, // by default otp er status ta 0 rakhbo. 0 mane hocche oi otp status ta use hoi nai. porobortite oi otp ta jokhon user use kore felbe status ta ke amra 1 kore debo.je user otp use kore felse.
},{timestamps: true,versionKey:false});
const OTPModel=mongoose.model('otps',OTPSchema);
module.exports=OTPModel

