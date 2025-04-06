'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ClientWrapper() {
  const pathname = usePathname();
  
  useEffect(() => {
    // Only hide footer on the landing page (root path)
    if (pathname === '/') {
      document.body.classList.add('hide-footer');
    } else {
      document.body.classList.remove('hide-footer');
    }
    
    // Cleanup when component unmounts
    return () => {
      document.body.classList.remove('hide-footer');
    };
  }, [pathname]);
  
  // This component doesn't render anything visible
  return null;
} 