'use client'

import { useEffect } from 'react'
import useSWR from 'swr'
import fetcher from '../../../lib/fetcher'
import { useAuth } from '../../../components/authProvider'
import {
  Table, TableBody, TableCaption, TableCell,
  TableHead, TableHeader, TableRow,
} from '../../../components/ui/table'

const ORDERS_API_URL = '/api/orders/'
const USERS_API_URL  = '/api/users/'

export default function AdminDashboard() {
  const { data: orders, error: ordersError, isLoading: ordersLoading } =
    useSWR(ORDERS_API_URL, fetcher)
  const { data: users,  error: usersError,  isLoading: usersLoading  } =
    useSWR(USERS_API_URL,  fetcher)

  const auth = useAuth()

  useEffect(() => {
    if (ordersError?.status === 401 || usersError?.status === 401) {
      auth.loginRequiredRedirect()
    }
  }, [ordersError, usersError, auth])

  if (ordersError || usersError) {
    if (ordersError?.status === 403 || usersError?.status === 403) {
      return <div className="p-8">Permission denied.</div>
    }
    return <div className="p-8">Failed to load admin data.</div>
  }

  if (ordersLoading || usersLoading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p className="mb-4">Total Customers: {users.length}</p>

      <Table>
        <TableCaption>Orders placed by customers</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>User ID</TableHead>
            <TableHead>Item</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map(o => (
            <TableRow key={o.id}>
              <TableCell>{o.id}</TableCell>
              <TableCell>{o.user_id}</TableCell>
              <TableCell>{o.item}</TableCell>
              <TableCell>{o.quantity}</TableCell>
              <TableCell>${o.total.toFixed(2)}</TableCell>
              <TableCell>
                {new Date(o.created).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  )
}
