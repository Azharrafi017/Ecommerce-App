import mongoose from "mongoose";
const connectdatabase= ()=>{
    try{
        mongoose.connect(process.env.DB_URL).then((data)=>{
            console.log(`Mongodb connected with server ${data.connection.host}`);
            })
    }
    catch(err){
        console.log(err);
    }
    
}
export default connectdatabase;