// IMPORTANT - This is needed - see this: https://yarnpkg.com/features/pnp#initializing-pnp
// Or else this will fail since iisnode is running directly against our entrypoint (server.js) and NOT starting the application with package.json scripts (yarn start)
require("./.pnp.cjs").setup();
require("dotenv").config();
const express = require("express");
const fns = require("date-fns");
const startupDateTime = fns.format(new Date(), "HH:mm:ss MM-dd-yyyy");

const app = express();
const port = process.env.PORT || 3000;

const homeController = require("./controllers/homeController.js");
const solarFlareController = require("./controllers/solarFlareController.js");
const solarEnergeticParticleController = require("./controllers/solarEnergeticParticleController.js");
const coronalMassEjectionController = require("./controllers/coronalMassEjectionController.js");

app.use("/", homeController);
app.use("/api/nasa/flr", solarFlareController);
app.use("/api/nasa/sep", solarEnergeticParticleController);
app.use("/api/nasa/cme", coronalMassEjectionController);
app.use("*", homeController);

app.listen(port, () =>
  console.log(
    `Application is listening on port: ${port} | Computer: ${process.env.COMPUTERNAME} | Datetime: ${startupDateTime}`
  )
);
