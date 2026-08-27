import express from "express";
import fs from "fs/promises";

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

app.listen(3000, () => console.log("API running on http://localhost:3000"));
