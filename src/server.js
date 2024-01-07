import app from "./app.js";
import { authenticated, syncUp } from "./config/database/database.js";
import { initModel } from "./config/database/initMode.js";
import { envs } from "./config/environments/environments.js";

async function main() {
  try {
    await authenticated();
    initModel();
    await syncUp();
  } catch (error) {
    console.error(error);
  }
}

main();

app.listen(envs.PORT, () => {
  console.log(`Server running on port: ${envs.PORT}`);
});
