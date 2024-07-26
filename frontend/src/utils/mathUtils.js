/**
 * Arredonda um percentual para um número específico de casas decimais.
 * 
 * @param {number} percentual - O valor percentual a ser arredondado.
 * @param {number} casasDecimais - O número de casas decimais para arredondar.
 * @returns {number} - O valor percentual arredondado.
 */
export function arredondarPercentual(percentual, casasDecimais = 2) {
    return parseFloat(percentual.toFixed(casasDecimais));
}