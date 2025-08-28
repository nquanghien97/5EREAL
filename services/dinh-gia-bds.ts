export async function DinhGiaBDS(data: { name: string, area: string, price: string }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/dinh-gia-bds`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.message || 'Something went wrong!');
  }
  return res.json();
}