import { Pool } from "pg";

export const pool = new Pool({
  user: process.env.USER_NAME || "postgres",
  host: process.env.HOST_NAME || "localhost",
  database: process.env.DB_NAME || "ticket_booking",
  password: process.env.DB_PASSWORD || "Madhu@997",
  port: process.env.PORT_NUMBER ? parseInt(process.env.PORT_NUMBER, 10) : 5432, // Default PostgreSQL port
});

pool.connect()
  .then(() => console.log("✅ Database connected successfully"))
  .catch((err) => console.error("❌ Database connection error:", err));

export default async function dbConnect(){
    await pool.connect((error, client: any, release) => {
        if(error){
            return console.error("Error in connecting Database", error.stack)
        }
        client.query("SELECT NOW()", (error: any)=>{
            release()
            if(error){
                return console.error("Error in query execution", error.stack)
            }
        })
    })
}