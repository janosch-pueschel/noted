import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "noted API is running" });
});

export default app;
