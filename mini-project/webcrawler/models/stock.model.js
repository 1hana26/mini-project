import mongoose from "mongoose";

//구조 정하기 ~한 데이터만 들어올 수 있어요.
const StockSchema = new mongoose.Schema({
    name : String,
    date : Date,
    price : Number
})

export const Stock = mongoose.model("Stock", StockSchema)