require('dotenv').config()
console.log(process.env.MONGO_URL)
const express = require("express");
const mongoose = require("mongoose");

const { userRouter } = require("./user");
const { courseRouter } = require("./course");
const { adminRouter } = require("./admin");
const app = express();
app.use(express.json());

app.get("/", (req,res)=>{
    res.json({
        message:"API is working fine"
    })
})
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);
app.use((req,res)=>{
    res.status(404).send({
        message: "No such endpoint"
    })
})

async function main() {
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(3000);
    console.log("listening on port 3000")
}

main()
