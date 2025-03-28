/**
 * Formatea un precio en formato de moneda
 * @param amount - Cantidad a formatear
 * @param locale - Configuración regional
 * @param currency - Moneda a utilizar
 * @returns Texto formateado
 */
export const formatCurrency = (
  amount: number,
  locale = 'es-MX',
  currency = 'MXN'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Formatea una fecha en formato legible
 * @param date - Fecha a formatear
 * @param locale - Configuración regional
 * @returns Texto de fecha formateado
 */
export const formatDate = (
  date: string | Date,
  locale = 'es-MX'
): string => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

/**
 * Formatea una fecha y hora en formato legible
 * @param dateTime - Fecha y hora a formatear
 * @param locale - Configuración regional
 * @returns Texto de fecha y hora formateado
 */
export const formatDateTime = (
  dateTime: string | Date,
  locale = 'es-MX'
): string => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateTime));
};

/**
 * Acorta un texto si excede la longitud máxima
 * @param text - Texto a acortar
 * @param maxLength - Longitud máxima
 * @returns Texto acortado
 */
export const truncateText = (text: string, maxLength = 100): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};
