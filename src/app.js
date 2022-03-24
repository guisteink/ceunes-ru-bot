const express = require("express");
// const noteRoutes = require("./routes/notes.routes");
const app = express();

// app.use("/note", noteRoutes);

app.use((error, req, res, next) =>
{
    res.status(500).json({ message: error.message });
});

app.get("/", (req, res) =>
{
    res.json("Bot on!");
});

module.exports = app;