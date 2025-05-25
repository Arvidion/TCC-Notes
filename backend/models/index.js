import db from "../config/Database";
import Users from "./UserModel";
import Notes from "./NoteModel";

Users.hasMany(Notes, {
    foreignKey: "userId",
    onDelete: "CASCADE"
});

Notes.belongsTo(Users, {
    foreignKey: "userId"
});

(async ()=>{
    try{
        await db.authenticate();
        console.log("Connected");

        await db.sync({alter: true});
    } catch (err){
        console.log("Failed : ", err)
    }
})();

export {Users, Notes};