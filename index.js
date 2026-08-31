import express from "express";
import fs from "fs/promises";
/**
 * @typedef {import("./models/Account.js")} Account
 * @typedef {import("./models/MigratedAccount.js")} MigratedAccount
 * @typedef {import("./models/TargetAccount.js")} TargetAccount
 */

// Account model defines the base shape of items in data.json
// MigratedAccount adds migration metadata fields
// TargetAccount defines the shape stored in datastore2.json

const Account = require("./models/Account.js");
const MigratedAccount = require("./models/MigratedAccount.js");
const TargetAccount = require("./models/TargetAccount.js");

const app = express();
app.use(express.json());

// GET all pipeline items
app.get("/pipeline", async (req, res) => {
  const raw = await fs.readFile("./data.json", "utf8");
  const data = JSON.parse(raw);
  res.json(data);
});

// POST a new pipeline item
app.post("/pipeline", async (req, res) => {
  const raw = await fs.readFile("./data.json", "utf8");
  const data = JSON.parse(raw);

  const newItem = {
    id: data.length + 1,
    name: req.body.name,
    status: req.body.status
  };

  data.push(newItem);
  await fs.writeFile("./data.json", JSON.stringify(data, null, 2));

  res.json(newItem);
});

app.post("/migrate", async (req, res) => {
  const raw = await fs.readFile("./data.json", "utf8");
  const data = JSON.parse(raw);
  
  await fs.writeFile("./datastore2.json", JSON.stringify(data, null, 2));
  res.json({ message: "Migration complete" });
});

app.listen(3000, () => console.log("API running on http://localhost:3000"));
