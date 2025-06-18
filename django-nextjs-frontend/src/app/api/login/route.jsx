import { DJANGO_API_ENDPOINT } from '../../../config/defaults';
import { setRefreshToken, setToken } from '../../../lib/auth';
import { NextResponse } from 'next/server';

const DJANGO_API_LOGIN_URL = `${DJANGO_API_ENDPOINT}/login`;
export async function POST(request) {
    const requestData = await request.json()
    console.log('Login requestData:', requestData)
    const { email, username, password } = requestData
    const loginPayload = {
        username,
        email,
        password,
    }
    const jsonData = JSON.stringify(loginPayload)
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: jsonData
    }
    const response = await fetch(DJANGO_API_LOGIN_URL, requestOptions)
    let responseData = null
    try {
      responseData = await response.json()
    } catch (e) {
      responseData = { error: 'Invalid JSON from backend', raw: await response.text() }
    }
    console.log('Django backend response:', responseData) 
    if (response.ok) {
        console.log("logged in")
        const {username, access, refresh} = responseData
        setToken(access)
        setRefreshToken(refresh)
        return NextResponse.json({"loggedIn": true, "username": username}, {status: 200})
    }
    return NextResponse.json({"loggedIn": false, ...responseData}, {status: 400})
}