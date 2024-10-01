

import mongoose from 'mongoose';


export const connectDatabase = async()=>{
    try {
        await mongoose.connect('mongodb+srv://new-user:new-user@cluster0.lfw2chz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

        if(mongoose.connect){
            console.log(
                "database is connected"
            )
        }
    } catch (error) {
        console.log("Error occured while connected with database", error)
    }
}

export default connectDatabase;