
import { cookies } from "next/headers"

// Base configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api'

// Helper function để handle response
async function handleResponse(response: Response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Network error' }))
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
  }
  return response.json()
}
export async function GetCoordinates() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('access_token')?.value
    const response = await fetch(`${API_BASE_URL}/coordinates`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      cache: 'no-store',
    })

    return await handleResponse(response)
  } catch (error) {
    console.error('Error getting coordinates:', error)
    throw error
  }
}