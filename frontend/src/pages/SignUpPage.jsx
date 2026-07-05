import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { MessageSquare, Lock, Eye, EyeOff, UserRound, Mail, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';
import toast from 'react-hot-toast';

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signUp, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if(!formData.fullName.trim()) return toast.error("Full name is required");
    if(!formData.email.trim()) return toast.error("Email is required");
    if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if(!formData.password) return toast.error("Password is required");
    if(formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if(success===true) signUp(formData);
  };

  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8'>
          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2 group'>
              <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                <MessageSquare className='size-6 text-primary' />
              </div>
              <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
              <p className='text-base-content/60'>Get started with your free account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6 flex flex-col'>
            <div>
              <label><span>Full Name</span></label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 flex items-center pl-2'>
                  <UserRound className='size-5' />
                </div>
                <input type="text" className='border-1 rounded-sm border-slate-300 pl-10 w-full'
                  placeholder='John Doe'
                  value={formData.fullName}
                  onChange={(e)=>setFormData({...formData,fullName:e.target.value})}
                />
              </div>
            </div>

            <div>
              <label><span>Email</span></label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 flex items-center pl-2'>
                  <Mail className='size-5' />
                </div>
                <input type="text" className='border-1 rounded-sm border-slate-300 pl-10 w-full'
                  placeholder='you@example.com'
                  value={formData.email}
                  onChange={(e)=>setFormData({...formData,email:e.target.value})}
                />
              </div>
            </div>

            <div>
              <label><span>Password</span></label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 flex items-center pl-2'>
                  <Lock className='size-5' />
                </div>
                <div className='absolute inset-y-0 right-0 flex items-center pr-2' onClick={()=>setShowPassword(!showPassword)}>
                  {showPassword ? (<EyeOff className='size-5 hover cursor-pointer'/>) : (<Eye className='size-5 hover cursor-pointer'/>)}
                </div>
                <input type={showPassword ? "text" : "password"} className='border-1 rounded-sm border-slate-300 pl-10 pr-10 w-full'
                  placeholder='••••••••'
                  value={formData.password}
                  onChange={(e)=>setFormData({...formData,password:e.target.value})}
                />
              </div>
            </div>

            <button type="submit" className='bg-yellow-500 btn w-full' disabled={isSigningUp}>
              {isSigningUp ? (<><Loader2 className='size-5 animate-spin' /> Loading...</>) : "Create Account"}
            </button>
          </form>

          <div className='text-center'>
            <p className='text-base-content/60'>Already have an account? <Link to="/login" className='link link-primary'>Sign in</Link></p>
          </div>
        </div>
      </div>

      <AuthImagePattern 
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones." />
    </div>
  )
}

export default SignUpPage
