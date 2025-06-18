'use client'

import { useEffect } from 'react'
import useSWR from 'swr'
import fetcher from '../../../lib/fetcher'
import { useAuth } from '../../../components/authProvider'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table'

const ORDERS_API_URL = '/api/orders/'

export default function AdminOrdersPage() {
  const { data, error, isLoading } = useSWR(ORDERS_API_URL, fetcher)
  const auth = useAuth()

  useEffect(() => {
    if (error?.status === 401) {
      auth.loginRequiredRedirect()
    }
  }, [error, auth])

  if (error) {
    if (error.status === 403) {
      return <div>Permission denied.</div>
    }
    return <div>failed to load</div>
  }
  if (isLoading) return <div>loading...</div>

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">All Orders</h1>
      <Table>
        <TableCaption>Orders placed by customers.</TableCaption>
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
          {data.map(order => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.user_id}</TableCell>
              <TableCell>{order.item}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>${order.total.toFixed(2)}</TableCell>
              <TableCell>{new Date(order.created).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  )
}