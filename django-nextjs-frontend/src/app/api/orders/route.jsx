import { NextResponse } from 'next/server';
import ApiProxy from '../proxy';
import { DJANGO_API_ENDPOINT } from '../../../config/defaults';

const DJANGO_API_ORDERS_URL = `${DJANGO_API_ENDPOINT}/orders/`;

export async function POST(request) {
  const payload = await request.json();
  const { data, status } = await ApiProxy.post(DJANGO_API_ORDERS_URL, payload, true);
  return NextResponse.json(data, { status });
}

export async function GET(request) {
  const { data, status } = await ApiProxy.get(DJANGO_API_ORDERS_URL, true);
  return NextResponse.json(data, { status });
}