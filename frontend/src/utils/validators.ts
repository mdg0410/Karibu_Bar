/**
 * Valida si un email tiene formato correcto
 * @param email - Email a validar
 * @returns boolean
 */
export const isValidEmail = (email: string): boolean => {
  const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return re.test(email);
};

/**
 * Valida si una contraseña cumple los requisitos mínimos de seguridad
 * @param password - Contraseña a validar
 * @returns boolean
 */
export const isValidPassword = (password: string): boolean => {
  // Al menos 6 caracteres, una letra mayúscula, una minúscula y un número
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  return re.test(password);
};

/**
 * Valida si un número de teléfono tiene formato válido
 * @param phone - Número de teléfono a validar
 * @returns boolean
 */
export const isValidPhone = (phone: string): boolean => {
  // Permite formatos como (123) 456-7890, 123-456-7890, 1234567890
  const re = /^(\+?\d{1,3})?[-. (]?\d{3}[-. )]?\d{3}[-. ]?\d{4}$/;
  return re.test(phone);
};

/**
 * Comprueba si dos contraseñas coinciden
 * @param password - Contraseña original
 * @param confirmPassword - Confirmación de contraseña
 * @returns boolean
 */
export const passwordsMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};
