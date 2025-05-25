import {Sequelize} from "sequelize";
import dotenv from "dotenv"

dotenv.config();

const {
    DB_NAME: database,
    DB_USERNAME: username,
    DB_PASSWORD: password,
    DB_HOST: host,
} = process.env

const db = new Sequelize(database, username, password,{
    host,
    dialect: 'mysql'
});

export default db;
