import { Sequelize } from "sequelize";
import { envs } from "../environments/environments.js";

export const sequelize = new Sequelize(envs.DB_URI, {
  logging: false,
});

export const authenticated = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection ok!...😊");
  } catch (error) {
    console.error(error);
  }
};

export const syncUp = async () => {
  try {
    await sequelize.sync();
    console.error("Synced ok!...👌");
  } catch (error) {
    console.error(error);
  }
};
