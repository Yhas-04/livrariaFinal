import React, { useState } from 'react';
import axios from 'axios';
import './CoverUpload.css';
const CoverUpload = ({ bookId, onUploaded }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [preview, setPreview] = useState(null);
    const handleFileChange = (e) => {
        const selectedFile = e.target.files?.[0] ?? null;
        setFile(selectedFile);
        setError('');
        setSuccess('');
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setPreview(null);
        }
    };
    const handleSubmit = async () => {
        if (!file) {
            setError('Por favor, selecione uma imagem.');
            return;
        }
        const formData = new FormData();
        formData.append('cover', file);
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            const response = await axios.post(
                `/api/livros/upload-cover/${bookId}`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            );
            setSuccess('Capa enviada com sucesso!');
            console.log('📸 [CoverUpload] Resposta do upload:', response.data);
            const coverPath = response.data.data?.cover_path || response.data.cover_path;
            console.log('📸 [CoverUpload] Cover path extraído:', coverPath);
            if (onUploaded) {
                console.log('📸 [CoverUpload] Chamando onUploaded com:', coverPath);
                onUploaded(coverPath);
            } else {
                console.error('❌ [CoverUpload] onUploaded não foi fornecido!');
            }
            setTimeout(() => {
                setSuccess('');
                setFile(null);
                setPreview(null);
            }, 3000);
        } catch (err) {
            console.error('Erro no upload:', err);
            setError(err.response?.data?.erro || 'Erro ao enviar a capa. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="cover-upload-form">
            <h3>📷 Upload de Capa</h3>
            <div className="cover-upload-input-group">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="cover-upload-input"
                    disabled={loading}
                />
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="btn-upload"
                    disabled={loading || !file}
                >
                    {loading ? 'Enviando...' : 'Enviar'}
                </button>
            </div>
            {preview && (
                <div className="cover-preview">
                    <img src={preview} alt="Preview da capa" />
                </div>
            )}
            {success && (
                <div className="upload-success">
                    ✓ {success}
                </div>
            )}
            {error && (
                <div className="upload-error">
                    ✗ {error}
                </div>
            )}
        </div>
    );
};
export default CoverUpload;