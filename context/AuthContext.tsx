'use client';
import { axiosGet, axiosPost } from '@/utils/api';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';

interface userProps {
  uid : string,
  id : string,
  name : string,
  email : string,
  role : string,
  isVerified : string,
}
interface authContextProps {
  user : userProps | null
  logout : ()=>void
  loading : boolean
}
const AuthContext = createContext({} as authContextProps);

export function AuthProvider({ children }:{children : React.ReactNode | React.JSX.Element}) {
  const [user, setUser] = useState<userProps | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosGet('/auth/admin/me',true);
        setUser(res)
      } catch (err) {
        setUser(null);
        toast.error('Error occured, session expired',{autoClose : 2000})
        toast.warning('Redirecting to login',{autoClose : 2000})
        setTimeout(()=>{
          console.log('about to redirect')
          router.push('/login')
        },2000)
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');
      setUser(null);
    } catch (error) {
      toast.error('An error occurred while logging user out')
    }
    
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
