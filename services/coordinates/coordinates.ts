
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

export async function SaveCoordinates({ lat, lng, note }: { lat: number, lng: number, note: string }) {
  try {
    const response = await fetch(`${API_BASE_URL}/coordinates`, {
      method: 'POST',
      body: JSON.stringify({ lat, lng, note }),
    })
    return handleResponse(response)
  } catch (error) {
    console.error('Error saving coordinates:', error)
    throw error
  }
}

export async function UpdateCoordinates({ id, note }: { id: number, note: string }) {
  try {
    const response = await fetch(`${API_BASE_URL}/coordinates/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ note }),
    })

    return await handleResponse(response)
  } catch (error) {
    console.error('Error saving coordinates:', error)
    throw error
  }
}

export async function DeleteCoordinates({ id }: { id: number }) {
  try {
    const response = await fetch(`${API_BASE_URL}/coordinates/${id}`, {
      method: 'DELETE',
    })

    return await handleResponse(response)
  } catch (error) {
    console.error('Error deleting coordinates:', error)
    throw error
  }
}

// Type definitions
export type Coordinate = {
  id: number
  lat: number
  lng: number
  userId: number
  createdAt: string
  updatedAt: string
}

export type CoordinatesResponse = {
  data: Coordinate[]
  message: string
}