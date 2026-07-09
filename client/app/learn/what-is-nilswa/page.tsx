
'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link';

export default function Page() {
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#f8f9fa', minHeight: '100vh', py: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
          <Link href="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.95rem' }}>
            Home
          </Link>
          <Typography sx={{ color: '#64748b', fontSize: '0.95rem' }}>
            Learn
          </Typography>
          <Typography sx={{ color: '#0ea5e9', fontSize: '0.95rem', fontWeight: 600 }}>
            What Is NILSWA?
          </Typography>
        </Breadcrumbs>
        <Paper 
          elevation={0}
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: '24px',
            backgroundColor: '#ffffff',
            boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
            border: '1px solid #e2e8f0'
          }}
        >
          <Typography variant="h2" sx={{ fontWeight: 800, color: '#111827', mb: 2 }}>
            What Is NILSWA?
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#1f2937', mt: 2 }}>
              The Traditional Software Model
            </Typography>
            <Typography variant="body1" sx={{ color: '#4b5563', fontSize: '1.1rem', lineHeight: 1.7 }}>
              Historically, enterprise product companies have operated on a rigid structure. They often require massive, heavy upfront payments before you can even begin using the software. Customers are forced into long-term contracts and forced to purchase licenses in bulk, meaning you frequently end up paying for unused seats and features before seeing any real return on your investment.
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 700, color: '#1f2937', mt: 4 }}>
              The NILSWA Difference
            </Typography>
            <Typography variant="body1" sx={{ color: '#4b5563', fontSize: '1.1rem', lineHeight: 1.7 }}>
              We are fundamentally changing the way products are currently sold. Instead of trapping you in the traditional model of heavy upfront costs, NILSWA introduces unparalleled flexibility and fairness. 
            </Typography>
            <Typography variant="body1" sx={{ color: '#4b5563', fontSize: '1.1rem', lineHeight: 1.7 }}>
              With our flexible subscription, you can start small. You have the freedom to subscribe with just 1 or 2 users to fully experience, test, and validate our enterprise product within your own business environment.
            </Typography>
            <Typography variant="body1" sx={{ color: '#4b5563', fontSize: '1.1rem', lineHeight: 1.7 }}>
              As you begin to see the immense value we provide, you can seamlessly scale up your user count on a monthly basis. This ensures that you completely eliminate large one-time payments and guarantee you are getting the maximum return on your investment, paying exactly—and only—for what you use.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
