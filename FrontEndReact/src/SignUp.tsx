import React, { useState } from "react"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Card } from "./components/ui/card"
import { Link } from "react-router-dom";

export default function SignUp() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!name || !email || !password || !confirm) {
      setError("Please fill out all fields.")
      return
    }
    if (password !== confirm) {
      setError("Passwords do not match.")
      return
    }

    setLoading(true)
    try {
      // Replace with real sign up call
      await new Promise((r) => setTimeout(r, 800))
      console.log({ name, email })
      setSuccess("Account created. Check your email to verify.")
      setName("")
      setEmail("")
      setPassword("")
      setConfirm("")
    } catch {
      setError("Sign up failed. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white p-6">
      <div className="w-full max-w-md">
        <Card>
          <div className="p-6">
            <h1 className="text-2xl font-semibold">Create your account</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Start your account — it’s free and only takes a minute.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {error && (
                <div className="text-sm text-destructive bg-destructive/10 p-2 rounded">
                  {error}
                </div>
              )}
              {success && (
                <div className="text-sm text-success bg-success/10 p-2 rounded">
                  {success}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="name">
                  Full name
                </label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="email">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="password">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="confirm">
                  Confirm password
                </label>
                <Input
                  id="confirm"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Repeat your password"
                  required
                />
              </div>

              <div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Creating account…" : "Create account"}
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/Login">Sign In</Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}