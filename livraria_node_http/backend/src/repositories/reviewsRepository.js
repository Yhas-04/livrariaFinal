const db = require('../database/sqlite');
const Review = require('../models/reviewModel');
module.exports = {
    async findByBookId(bookId) {
        try {
            console.log('🔍 findByBookId called with bookId:', bookId);
            const sql = `
                SELECT r.id, r.book_id, r.rating, r.comment, r.created_at, r.updated_at, u.id AS user_id, u.username
                FROM reviews r
                         JOIN users u ON r.user_id = u.id
                WHERE r.book_id = ?
                ORDER BY r.created_at DESC
            `;
            const rows = db.all(sql, [bookId]);
            console.log('✅ Rows returned:', rows.length);
            const reviews = rows.map(row => {
                console.log('📦 Processing row:', row);
                return new Review({ ...row, username: row.username });
            });
            console.log('✅ Reviews created:', reviews);
            return reviews;
        } catch (error) {
            console.error('❌ Error in findByBookId:', error);
            throw error;
        }
    },
    async findById(id) {
        const sql = `SELECT * FROM reviews WHERE id = ? LIMIT 1`;
        const row = await db.get(sql, [id]);
        return row ? new Review(row) : null;
    },
    async create({ userId, bookId, rating, comment }) {
        try {
            console.log('➕ create review called with:', { userId, bookId, rating, comment });
            const sql = `
      INSERT INTO reviews (user_id, book_id, rating, comment, created_at, updated_at)
      VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `;
            const result = db.run(sql, [userId, bookId, rating, comment || null]);
            console.log('✅ Insert result:', result);
            const id = result && (result.lastID || result.last_id || result.insertId) ? (result.lastID || result.last_id || result.insertId) : null;
            console.log('🆔 Generated ID:', id);
            const created = await this.findById(id);
            console.log('✅ Created review:', created);
            return created;
        } catch (error) {
            console.error('❌ Error in create:', error);
            throw error;
        }
    }
};