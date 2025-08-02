const express = require("express");
const rpc = require("discord-rpc");

const clientId = 'YOUR_DISCORD_APP_ID';
rpc.register(clientId);

const app = express();
const client = new rpc.Client({ transport: "ipc" });
let startTimestamp = new Date();

client.on("ready", () => {
  console.log("Discord RPC is ready!");

  app.get("/rpc/update", (req, res) => {
    const { details, state } = req.query;
    client.setActivity({
      details: details || "Using TurboWarp",
      state: state || "Making something cool",
      startTimestamp,
      largeImageKey: "tw_icon",
      largeImageText: "TurboWarp",
      instance: false,
    });
    res.send("Status updated.");
  });

  app.get("/rpc/clear", (req, res) => {
    client.clearActivity();
    res.send("Status cleared.");
  });

  app.listen(3000, () => {
    console.log("RPC server listening on http://localhost:3000");
  });
});

client.login({ clientId }).catch(console.error);
