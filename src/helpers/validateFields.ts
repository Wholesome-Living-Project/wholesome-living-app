
const validateEmail = (email: string) => {
  // Basic email validation check
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

const validateName = (name: string) => {
  // Name validation check (only allowing letters, spaces, and hyphens)
  const regex = /^[A-Za-z\s-]+$/
  return regex.test(name) && name.length >= 2 
}

const validatePassword = (password: string) => {
  // Password validation check (e.g., minimum length, specific characters)
  return password.length >= 8
}

export {validateEmail, validateName, validatePassword}