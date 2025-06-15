import LoginForm from "../../components/layout/login-form"
const LOGIN_URL = "/api/login/" 
export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm action={LOGIN_URL}/>
      </div>
    </div>
  )
}
