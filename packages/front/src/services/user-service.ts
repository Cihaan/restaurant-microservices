export async function checkTokenValidity(token): Promise<boolean> {
  try {
    const response = await fetch('http://localhost:8000/auth/check-auth', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.ok
  } catch (error) {
    console.error('Error checking user existence:', error)
    return false
  }
}
