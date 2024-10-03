'use client'
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { auth } from './Authentication';
import Login from './Login';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
      setLoading(false); 
      if (!user && pathname !== '/') {
        setShowLogin(true);
      } else {
        setShowLogin(false);
      }
    });

    return () => unsubscribe();
  }, [pathname]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (showLogin) {
    return <Login onClose={() => { setShowLogin(false); router.push('/'); }} />;
  }

  return children;
};

export default ProtectedRoute;