import { NextResponse } from "next/server";
import ApiProxy from "../proxy";
import { DJANGO_API_ENDPOINT } from "../../../config/defaults";

const DJANGO_API_USERS_URL = `${DJANGO_API_ENDPOINT}/users/`;

export async function GET(request) {
  const { data, status } = await ApiProxy.get(DJANGO_API_USERS_URL, true);
  return NextResponse.json(data, { status });
}