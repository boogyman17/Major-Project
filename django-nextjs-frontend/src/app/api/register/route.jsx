import { NextResponse } from 'next/server'

const DJANGO_API_REGISTER_URL = "http://127.0.0.1:8000/api/register"

export async function POST(request) {
  const requestData = await request.json()
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestData)
  }
  const response = await fetch(DJANGO_API_REGISTER_URL, requestOptions)
  let data = null
  try {
    data = await response.json()
  } catch (e) {
    data = { error: 'Invalid JSON from backend', raw: await response.text() }
  }
  const status = response.ok ? 201 : response.status
  return NextResponse.json(data, { status })
}