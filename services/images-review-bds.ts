export async function getImagesReview({ coordinatesId }: { coordinatesId: number }) {
  const params = new URLSearchParams();
  if (coordinatesId) params.append('coordinatesId', coordinatesId.toString());
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/images-review-bds?${params.toString()}`)
  return res.json()
}

export async function addImagesReview(formData: FormData) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/images-review-bds`, {
    method: 'POST',
    body: formData
  })
  return res.json()
}

export async function deleteImagesReview(id: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/images-review-bds/${id}`, {
    method: 'DELETE'
  })
  return res.json()
}