import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Notes = db.define('noteshavas',{
    title: DataTypes.STRING,
    note: DataTypes.STRING,
    userId: DataTypes.INTEGER
},{
    freezeTableName: true,
    timestamps: true,
    createdAt: "Tanggal_dibuat",
    updatedAt: "Tanggal_diperbarui"
});

export default Notes;

(async()=>{
    await db.sync();
})();
