import { LoginUserDTO, RegisterUserDTO } from "@/dto/user";

export async function RegisterUser(data: RegisterUserDTO) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, {
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

export async function LoginUser(data: LoginUserDTO) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
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

export async function LogoutUser() {
  await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
  });
}


export async function getMe() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/me`, {
    method: 'GET',
    credentials: 'include',
  }
  )
  return res.json()
}