import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginSignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isSignup, setIsSignup] = useState(false);

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  const cardVariants = {
    initial: { rotateY: 90 },
    animate: { rotateY: 0 },
    exit: { rotateY: -90 }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
          <AnimatePresence mode="wait">
            {isSignup ? (
              <motion.div
                key="signup"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={cardVariants}
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-2 w-full bg-white rounded-lg"
              >
                <div className="relative hidden bg-muted md:block rounded-lg">
                  <img
                    src="/finance.png"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-contain dark:brightness-[0.2] dark:grayscale"
                  />
                </div>
                <form className="p-6 md:p-8">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center text-center">
                      <h1 className="text-2xl font-bold">Create an Account</h1>
                      <p className="text-balance text-muted-foreground">
                        Sign up for Kha₹cha
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input 
                        id="password" 
                        type="password" 
                        required 
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input 
                        id="confirm-password" 
                        type="password" 
                        required 
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Sign Up
                    </Button>
                    <div className="text-center text-sm">
                      Already have an account?{" "}
                      <button 
                        type="button"
                        onClick={toggleForm}
                        className="underline underline-offset-4"
                      >
                        Login
                      </button>
                    </div>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="login"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={cardVariants}
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-2 w-full bg-white rounded-lg"
              >
                <form className="p-6 md:p-8">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center text-center">
                      <h1 className="text-2xl font-bold">Welcome back</h1>
                      <p className="text-balance text-muted-foreground">
                        Login to your Kha₹cha account
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <a
                          href="#"
                          className="ml-auto text-sm underline-offset-2 hover:underline"
                        >
                          Forgot your password?
                        </a>
                      </div>
                      <Input id="password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full">
                      Login
                    </Button>
                    <div className="text-center text-sm">
                      Don&apos;t have an account?{" "}
                      <button 
                        type="button"
                        onClick={toggleForm}
                        className="underline underline-offset-4"
                      >
                        Sign up
                      </button>
                    </div> 
                  </div>
                </form>
                <div className="relative hidden bg-muted md:block rounded-lg">
                  <img
                    src="/finance.png"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-contain dark:brightness-[0.2] dark:grayscale"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
    </div>
  )
}