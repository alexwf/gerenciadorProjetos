/**
 * Formata uma data no formato YYYY-MM-DDTHH:mm:ss.sssZ para DD/MM/YYYY.
 * @param {string} dateString - A string da data no formato ISO 8601.
 * @returns {string} - A data formatada no formato DD/MM/YYYY.
 */
export function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR'); // Formata a data para DD/MM/YYYY
}