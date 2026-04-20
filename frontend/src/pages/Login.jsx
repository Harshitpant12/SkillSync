import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Eye, EyeOff, Loader2, ShieldCheck, Fingerprint, Activity } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Left Side Animation State 
  const [authStep, setAuthStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAuthStep((prev) => (prev + 1) % 3);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const toastId = toast.loading('Authenticating...');

    try {
      await login(formData.email, formData.password);
      
      toast.success('Access Granted.', { id: toastId });
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
      
    } catch (err) {
      console.error("Login Error:", err);
      toast.error(err.response?.data?.message || 'Invalid credentials. Please try again.', { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white font-sans">
      
      <Toaster position="top-center" reverseOrder={false} />

      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 bg-gray-50 relative items-center justify-center overflow-hidden border-r border-gray-200">
            
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-50"></div>
        <div className="absolute w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full"></div>

        <div className="relative z-10 w-full max-w-md">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white rounded-3xl p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100 relative">
                
                <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center text-white">
                            <ShieldCheck size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">Secure Gateway</h3>
                            <p className="text-sm text-gray-500 font-jetbrains">Status: Active</p>
                        </div>
                    </div>
                    {/* Pulsing indicator */}
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                </div>

                <div className="h-32 flex items-center justify-center relative">
                    <AnimatePresence mode="wait">
                        {authStep === 0 && (
                            <motion.div key="scan" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col items-center text-gray-500 gap-3">
                                <Fingerprint size={40} className="animate-pulse text-blue-500" />
                                <span className="font-jetbrains text-sm uppercase tracking-widest">Awaiting Credentials</span>
                            </motion.div>
                        )}
                        {authStep === 1 && (
                            <motion.div key="verify" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col items-center text-gray-500 gap-3">
                                <Activity size={40} className="text-blue-500 animate-bounce" />
                                <span className="font-jetbrains text-sm uppercase tracking-widest">Verifying Hash...</span>
                            </motion.div>
                        )}
                        {authStep === 2 && (
                            <motion.div key="grant" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center text-green-600 gap-3">
                                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                    <ShieldCheck size={24} />
                                </div>
                                <span className="font-bold text-xl tracking-tight text-gray-900">Connection Secured</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -right-8 -bottom-8 bg-gray-900 rounded-2xl p-4 shadow-2xl border border-gray-800 flex items-center gap-3 text-white"
            >
                <Lock size={16} className="text-blue-400" />
                <span className="text-sm font-bold font-jetbrains">256-bit Encrypted</span>
            </motion.div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24 lg:px-32 relative z-10 bg-white">
          <div className="absolute inset-0 bg-blue-50/50 lg:hidden -z-10"></div>

          <div className="max-w-md w-full mx-auto">
              <div className="mb-10">
                  <Link to="/" className="font-black text-2xl tracking-tighter text-gray-900 font-jetbrains">
                      SkillSync
                  </Link>
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight mt-6">Welcome back</h1>
                  <p className="text-gray-500 mt-2 font-medium">
                      Log in to access your optimized resumes and scoring metrics.
                  </p>
              </div>

              <div className="flex flex-col gap-3 mb-8">
                  <button type="button" className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-bold transition-all hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm shadow-sm cursor-pointer">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      Continue with Google
                  </button>
              </div>

              <div className="flex items-center gap-3 mb-8">
                  <div className="h-0.5 flex-1 bg-gray-200"></div>
                  <span className="text-xs text-gray-400 uppercase tracking-widest font-jetbrains bg-white px-2">Or Email</span>
                  <div className="h-0.5 flex-1 bg-gray-200"></div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail size={18} className="text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                      </div>
                      <input 
                          type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required disabled={isLoading}
                          className="w-full bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 focus:bg-white transition-all disabled:opacity-60"
                      />
                  </div>

                  <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Lock size={18} className="text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                      </div>
                      <input 
                          type={showPassword ? "text" : "password"} 
                          name="password" value={formData.password} onChange={handleChange} placeholder="Password" required disabled={isLoading}
                          className="w-full bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 rounded-xl pl-12 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 focus:bg-white transition-all disabled:opacity-60"
                      />
                      <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                      >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                  </div>

                  <button 
                      type="submit" 
                      disabled={isLoading}
                      className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-600/20 group disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                  >
                      {isLoading ? (
                          <>
                              <Loader2 size={18} className="animate-spin" />
                              Authenticating...
                          </>
                      ) : (
                          <>
                              Access Workspace
                              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                          </>
                      )}
                  </button>
              </form>

              <div className="mt-8 text-center text-sm text-gray-500 font-medium">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-blue-600 hover:text-blue-700 font-bold transition-colors">
                      Initialize one here
                  </Link>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Login;