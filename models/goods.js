const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let goodsSchema = new Schema({
  grNum: Number,
  //  packageQuantity: Number,
  //  actualWeight: Number,
  // chargeWeight: Number,
  // ratePerKg: Number,
  //ratePerPeice: Number,
  //discription: String,
  // total: Number
  packageQuantity: Number,
  actualWeight: Number,
  chargeWeight: Number,
  rate: Number,
  discription: String,
  total: Number
  //  isVerified: { type: Boolean, default: false },
  //  isBlocked: { type: Boolean, default: false },
  //  isDeleted: { type: Boolean, default: false },
})

module.exports = mongoose.model('goods', goodsSchema);