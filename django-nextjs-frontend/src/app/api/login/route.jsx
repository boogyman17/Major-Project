// import { DJANGO_API_ENDPOINT } from '../../config/defaults'
// import { setRefreshToken, setToken } from '../../lib/auth'
import { NextResponse } from 'next/server'

const DJANGO_API_LOGIN_URL = "http://127.0.0.1:8000/api/token/pair"

export async function POST(request) {
    const requestData = await request.json()
    console.log('Login requestData:', requestData) 
    const jsonData = JSON.stringify(requestData)
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