import express from "express";
import fs from "fs/promises";
import enrichMigration from "./utils/enrichMigration.js";
import chunk from "./utils/chunk.js";
import getBatchSize from "./utils/getBatchSize.js";
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

// POST migrate endpoint to start migration run of records present in data.json to datastore2.json
app.post("/migrate", async (req, res) => {
  const raw = await fs.readFile("./data.json", "utf8");
  const data = JSON.parse(raw);

  // enrich
  const enriched = data.map(enrichMigration)

  // get batch size
  const total = enriched.length
  const BATCH_SIZE = getBatchSize(total, 10);

  const batches = chunk(enriched, BATCH_SIZE);

  const batchLogs = [];

  for (let i = 0; i < batches.length; i++) {
    batchLogs.push({
      batch_id: i + 1, 
      batch_size: batches[i].length,
      status: "success",
      timestamp: new Date().toISOString()
    });
  }

  // Write enriched data to both datastores
  await fs.writeFile("./datastore2.json", JSON.stringify(enriched, null, 2));
  await fs.writeFile("./data.json", JSON.stringify(enriched, null, 2));
  
  res.json({
    migrated_count: enriched.length,
    batch_size: BATCH_SIZE,
    batch_count: batches.length,
    batch_logs: batchLogs
  });
});

app.listen(3000, () => console.log("API running on http://localhost:3000"));
