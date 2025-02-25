export const setAuthUser = (email: string) => {
  localStorage.setItem("userEmail", email)
}

export const getAuthUser = () => {
  return localStorage.getItem("userEmail")
}

export const removeAuthUser = () => {
  localStorage.removeItem("userEmail")
}

export const isAuthenticated = () => {
  return !!getAuthUser()
}