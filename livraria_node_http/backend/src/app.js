const express = require("express");
const path = require("path"); 
const app = require("./config/express");
const db = require("./database/sqlite");
db.init();
const uploadsDir = path.join(__dirname, "..", "uploads");
app.use("/uploads", express.static(uploadsDir));
const routes = require("./routes");
app.use("/api", routes);
const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);
app.use((req, res) => {
    res.status(404).json({ erro: "Endpoint não encontrado" });
});
module.exports = app;