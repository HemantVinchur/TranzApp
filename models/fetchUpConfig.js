const mongoose=require('mongoose');
const Schema=mongoose.Schema;

let fetchConfigSchema=new Schema({

    individualGoodsFormula:String,
    totalGoodsFormula:String

})


module.exports=mongoose.model('fetchAppConfig',fetchConfigSchema);