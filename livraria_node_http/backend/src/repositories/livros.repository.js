const RepositoryBase = require("./repository.interface");
const db = require("../database/sqlite");
const Livro = require("../models/livro.model");
class LivrosRepository extends RepositoryBase {
    constructor() {
        super();
    }
    findAll() {
        const rows = db.all(
            "SELECT id, titulo, autor, categoria, ano, editora, cover_path FROM livros ORDER BY id ASC"
        );
        return rows.map(row => Livro.fromJSON(row));
    }
    findById(id) {
        const row = db.get(
            "SELECT id, titulo, autor, categoria, ano, editora, cover_path FROM livros WHERE id = ?",
            [id]
        );
        return row ? Livro.fromJSON(row) : null;
    }
    create(livroData) {
        const novoLivro = new Livro({ id: null, ...livroData });
        const result = db.run(
            "INSERT INTO livros (titulo, autor, categoria, ano, editora) VALUES (?, ?, ?, ?, ?)",
            [
                novoLivro.titulo,
                novoLivro.autor,
                novoLivro.categoria,
                novoLivro.ano,
                novoLivro.editora
            ]
        );
        return this.findById(result.lastInsertRowid);
    }
    update(id, dadosAtualizados) {
        console.log('💾 [REPO] Update - ID:', id, 'Dados:', dadosAtualizados);
        const existente = this.findById(id);
        if (!existente) {
            console.error('❌ [REPO] Livro não encontrado para ID:', id);
            const error = new Error("Livro não encontrado");
            error.statusCode = 404;
            throw error;
        }
        console.log('📖 [REPO] Livro existente:', existente.toJSON());
        const atualizado = new Livro({
            ...existente.toJSON(),
            ...dadosAtualizados
        });
        console.log('🔄 [REPO] Livro atualizado (merged):', atualizado.toJSON());
        const result = db.run(
            "UPDATE livros SET titulo = ?, autor = ?, categoria = ?, ano = ?, editora = ?, cover_path = ? WHERE id = ?",
            [
                atualizado.titulo,
                atualizado.autor,
                atualizado.categoria,
                atualizado.ano,
                atualizado.editora,
                atualizado.cover_path || null,
                id
            ]
        );
        console.log('✅ [REPO] Resultado do DB Run:', result);
        const livroFinal = this.findById(id);
        console.log('📚 [REPO] Livro após update:', livroFinal?.toJSON());
        return livroFinal;
    }
    delete(id) {
        const existente = this.findById(id);
        if (!existente) {
            const error = new Error("Livro não encontrado");
            error.statusCode = 404;
            throw error;
        }
        db.run("DELETE FROM livros WHERE id = ?", [id]);
        return existente;
    }
    updateCoverPath(id, coverPath) {
        console.log('📚 [REPO] Tentando atualizar cover_path para:', coverPath, 'no livro ID:', id);
        const existente = this.findById(id);
        if (!existente) {
            console.error('❌ [REPO] Livro não encontrado para ID:', id);
            const error = new Error("Livro não encontrado");
            error.statusCode = 404;
            throw error;
        }
        const result = db.run(
            "UPDATE livros SET cover_path = ? WHERE id = ?",
            [coverPath || null, id]
        );
        console.log('✅ [REPO] Resultado do DB Run:', result);
        return this.findById(id);
    }
}
module.exports = LivrosRepository;