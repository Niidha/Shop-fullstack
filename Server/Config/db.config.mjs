import {connect} from "mongoose"
import env from "dotenv"

env.config()
const dbConnect=async()=>{
    try{
       const {connection}=await connect(process.env.MONGO_URL,{
        dbName:"Shop"
       })
       const db=connection.db.databaseName
       console.log("connected",db);
       
    }catch(err){
          console.log(err);
          
    }

}

export default dbConnect