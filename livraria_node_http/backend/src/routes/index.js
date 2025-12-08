const express = require("express");
const router = express.Router();
const livrosRoutes = require("./livros.routes");
const authRoutes = require("./auth.routes");
const favoritesRoutes = require("./favorites.routes");
const reviewsRoutes = require("./reviews.routes");
router.get("/", (req, res) => {
    res.status(200).json({
        mensagem: "Bem-vindo à API da Livraria! Use /livros para gerenciar os livros.",
    });
});
router.use("/livros", livrosRoutes);
router.use("/auth", authRoutes);
router.use("/favorites", favoritesRoutes);
router.use("/reviews", reviewsRoutes);
module.exports = router;