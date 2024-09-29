import mongoose from "mongoose";

import app from "./app";
import config from "./app/config";


async function main() {
   try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.PORT, () => {
        console.log(`Campers Shop listening on port ${config.PORT}`)
      })
   } catch (error: any) {
    console.log(error.message as string);
    process.exit(1);
   }
  
}

main()
   