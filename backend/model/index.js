import db from "../config/Database.js";
import Users from "./UsersModel.js";
import Notes from "./NotesModel.js";

// Relasi
Users.hasMany(Notes, { foreignKey: "userId", onDelete: "CASCADE" });
Notes.belongsTo(Users, { foreignKey: "userId" });

// Sinkronisasi semua tabel
(async () => {
  try {
    await db.authenticate();
    console.log("Database Connected");

    await db.sync({ alter: true });
    console.log("Table Syncronized");
  } catch (err) {
    console.error("Error : ", err);
  }
})();

export { Users, Notes };
