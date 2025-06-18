export const DJANGO_BASE_URL =
  process.env.NEXT_PUBLIC_DJANGO_BASE_URL || "http://127.0.0.1:8000";
export const DJANGO_API_ENDPOINT = `${DJANGO_BASE_URL}/api`;