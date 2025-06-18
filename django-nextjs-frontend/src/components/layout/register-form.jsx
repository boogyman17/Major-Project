'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '../../lib/utils'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

export default function RegisterForm({ className, ...props }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    })
    const body = await res.json().catch(() => ({}))
    if (!res.ok) {
      setError(body.message || 'Registration failed. Please try again.')
      return
    }
    setSuccess('Account created! Redirecting to login...')
    router.push('/login')
  }

  return (
    <div className={cn('relative flex flex-col gap-6', className)} {...props}>
      {error && (
        <div className="fixed top-5 right-5 z-50 max-w-xs bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg flex justify-between items-center">
          <span>{error}</span>
          <button onClick={() => setError('')} className="ml-4 font-bold hover:text-red-900">
            ×
          </button>
        </div>
      )}
      {success && (
        <div className="fixed top-5 right-5 z-50 max-w-xs bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg flex justify-between items-center">
          <span>{success}</span>
          <button onClick={() => setSuccess('')} className="ml-4 font-bold hover:text-green-900">
            ×
          </button>
        </div>
      )}
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
            <div className="flex flex-col items-center text-center gap-2">
              <h1 className="text-2xl font-bold">Create an account</h1>
              <p className="text-muted-foreground text-sm">Sign up for a new Wintons Teak account</p>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" value={username} onChange={e => setUsername(e.target.value)} required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="m@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full">Sign up</Button>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img src="cathal-mac-an-bheatha-cvRKmOp_fl4-unsplash.jpg" alt="Chair" className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}