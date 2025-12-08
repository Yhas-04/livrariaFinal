const LivrosRepository = require("../repositories/livros.repository");
class LivrosController {
    constructor() {
        this.livrosRepository = new LivrosRepository();
    }
    async listarLivros(req, res, next) {
        try {
            const livros = this.livrosRepository.findAll(); 
            res.status(200).json(livros);
        } catch (err) {
            console.error(err);
            res.status(500).json({ erro: "Erro interno ao listar livros" });
        }
    }
    async buscarLivroPorId(req, res, next) {
        const id = parseInt(req.params.id);
        const livro = await this.livrosRepository.findById(id);
        if (!livro) {
            return res.status(404).json({ erro: "Livro não encontrado" });
        }
        res.status(200).json(livro);
    }
    async criarLivro(req, res, next) {
        const { titulo, autor, categoria, ano, editora } = req.body;
        const novoLivro = await this.livrosRepository.create({
            titulo,
            autor,
            categoria,
            ano: parseInt(ano),
            editora
        });
        res.status(201).json({
            mensagem: "Livro criado com sucesso",
            data: novoLivro
        });
    }
    async atualizarLivro(req, res, next) {
        const id = parseInt(req.params.id);
        console.log('📝 [Controller] Atualizando livro ID:', id);
        console.log('📝 [Controller] Dados recebidos:', req.body);
        const { titulo, autor, categoria, ano, editora, cover_path } = req.body;
        const dadosAtualizacao = {
            titulo,
            autor,
            categoria,
            ano: parseInt(ano),
            editora
        };
        if (cover_path !== undefined && cover_path !== null) {
            dadosAtualizacao.cover_path = cover_path;
            console.log('🖼️ [Controller] Incluindo cover_path:', cover_path);
        }
        console.log('📝 [Controller] Dados para atualização:', dadosAtualizacao);
        const livroAtualizado = await this.livrosRepository.update(id, dadosAtualizacao);
        console.log('✅ [Controller] Livro atualizado:', livroAtualizado);
        res.status(200).json({
            mensagem: "Livro atualizado com sucesso",
            data: livroAtualizado
        });
    }
    async removerLivro(req, res, next) {
        const id = parseInt(req.params.id);
        const livroRemovido = await this.livrosRepository.delete(id);
        res.status(200).json({
            mensagem: "Livro removido com sucesso",
            data: livroRemovido
        });
    }
    async uploadCover(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            if (!req.file) return res.status(400).json({ erro: 'Nenhum arquivo enviado.' });
            const relativePath = `/uploads/${req.file.filename}`;
            const livroAtualizado = await this.livrosRepository.updateCoverPath(id, relativePath);
            res.status(200).json({
                mensagem: "Capa atualizada com sucesso",
                data: livroAtualizado
            });
        } catch (error) {
            next(error);
        }
    }
}
module.exports = LivrosController;