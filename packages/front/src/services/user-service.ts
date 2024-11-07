export async function checkTokenValidity(): Promise<boolean> {
  try {
    const response = await fetch('http://localhost:8000/auth/users', {
      credentials: 'include',
    })
    return response.ok
  } catch (error) {
    console.error('Error checking user existence:', error)
    return false
  }
}

export async function isAdmin(): Promise<boolean> {
  try {
    const response = await fetch('http://localhost:8000/auth/is-admin', {
      credentials: 'include',
    })
    return response.ok
  } catch (error) {
    console.error('Error checking user existence:', error)
    return false
  }
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const response = await fetch('http://localhost:8000/auth/is-authenticated', {
      credentials: 'include',
    })
    return response.ok
  } catch (error) {
    console.error('Error checking user existence:', error)
    return false
  }
}
