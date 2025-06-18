"use client";

import { useEffect } from "react";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";
import { useAuth } from "../../components/authProvider";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

const USERS_API_URL = "/api/users/";

export default function CustomersPage() {
  const { data, error, isLoading } = useSWR(USERS_API_URL, fetcher);
  const auth = useAuth();

  useEffect(() => {
    if (error?.status === 401) {
      auth.loginRequiredRedirect();
    }
  }, [error, auth]);

  if (error) {
    if (error.status === 403) {
      return <div>Permission denied.</div>;
    }
    return <div>failed to load</div>;
  }
  if (isLoading) return <div>loading...</div>;

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Customers</h1>
      <Table>
        <TableCaption>All registered users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}