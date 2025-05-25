import db from "../config/Database.js";
import Users from "./UsersModel.js";
import Notes from "./NotesModel.js";

Users.hasMany(Notes, { foreignKey: "userId", onDelete: "CASCADE" });
Notes.belongsTo(Users, { foreignKey: "userId" });

(async () => {
  try {
    await db.authenticate();
    console.log("Database connected");

    await db.sync({ alter: true });
    console.log("Table syncronized.");
  } catch (err) {
    console.error("Error database :", err);
  }
})();

export { Users, Notes };
