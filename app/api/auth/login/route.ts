import { axiosGet, axiosPost } from '@/utils/api';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req:NextRequest) {
  try {
    const { email, password } = await req.json();

    // Send login request to your backend
    const res = await axiosPost(`/auth/admin/login`,{ email, password }, false)
    if (!res.statusText) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const { token } = res.data;

    // Set token as httpOnly cookie
    const response = NextResponse.json({ message: 'Login successful' });
    response.cookies.set('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1 * 24 * 60 * 60, // 1 day
      path: '/',
    });
    return response;
  } catch (error) {
    return NextResponse.json({message : 'Invalid credentials', error}, { status: 401 });
  }
  
}