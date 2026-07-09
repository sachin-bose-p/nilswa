'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import Box from '@mui/material/Box';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '';
  const isDashboard = pathname.startsWith('/dashboard');

  return (
    <>
      {!isDashboard && <Navbar />}
      <Box component="main" sx={{ flexGrow: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {children}
      </Box>
      {!isDashboard && <Footer />}
    </>
  );
}
