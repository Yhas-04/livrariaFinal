import api from './api';
export const reviewsService = {
    listarPorLivro: async (bookId) => {
        const response = await api.get(`/reviews/book/${bookId}`);
        return response.data;
    },
    listarPorUsuario: async (userId) => {
        const response = await api.get(`/reviews/user/${userId}`);
        return response.data;
    },
    criar: async (reviewData) => {
        const response = await api.post('/reviews', reviewData);
        return response.data;
    },
    atualizar: async (reviewId, reviewData) => {
        const response = await api.put(`/reviews/${reviewId}`, reviewData);
        return response.data;
    },
    remover: async (reviewId) => {
        const response = await api.delete(`/reviews/${reviewId}`);
        return response.data;
    },
    obter: async (reviewId) => {
        const response = await api.get(`/reviews/${reviewId}`);
        return response.data;
    },
    verificarAvaliacao: async (userId, bookId) => {
        try {
            const reviews = await reviewsService.listarPorUsuario(userId);
            return reviews.find(review => review.book_id === bookId);
        } catch (error) {
            console.error('Erro ao verificar avaliação:', error);
            return null;
        }
    }
};