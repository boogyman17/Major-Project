
export default async function fetcher(url) {

  const token = localStorage.getItem('accessToken')

const res = await fetch(url, {
    credentials: 'include',            
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })

  
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    error.info   = await res.json().catch(() => ({}))
    error.status = res.status
    throw error
  }

  return res.json()
}
