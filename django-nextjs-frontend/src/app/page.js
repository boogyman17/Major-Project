"use client"
import {useState} from 'react';
import image from "next/image"; 
import useSWR from 'swr';
import { useAuth } from '../components/authProvider';
import { ThemeToggleButton } from '../components/themeToggleButton';
import WaitlistForm from './waitlists/forms';


const fetcher = (...args) => fetch(...args).then(res => res.json())


export default function Home() {
  const[dataStr, setDataStr] = useState('')
  const auth = useAuth();
  async function getDjangoAPIData() {
    const response = await fetch("http://127.0.0.1:8000/api/hello");
    const data = await response.json();
    //console.log(data);
    setDataStr(JSON.stringify(data))
    const auth = useAuth()
    //const {data, error, isLoading} = useSWR("/api/hello", fetcher)
  }
  // if (error) return <div>failed to load</div>
  // if (isLoading) return <div>loading...</div>
 
  async function handleClick() {
    await getDjangoAPIData()
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick ={handleClick}>
        Lookup Data
      </button>
      <div>
        {dataStr}
        </div>  
      <div>
        <WaitlistForm />
      </div>
      
      <div>
        {auth.isAuthenticated ? "Hello user" : "Hello guest"}
      </div>
      <div>
        <ThemeToggleButton />
      </div>

    </main>
  );
}
//line 36 = {data && data.apiEndpoint}