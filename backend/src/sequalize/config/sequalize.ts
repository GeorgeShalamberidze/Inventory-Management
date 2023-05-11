import { Sequelize } from "sequelize";

const sequelize: Sequelize = new Sequelize("test", "postgres", "Ablabuda123", {
  host: "localhost",
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

export default sequelize;
