'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'; // We can use Grid for layout
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from 'next/link';
import { Container } from '@mui/material';

export default function Home() {
  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            NILSWA Cloud
          </Typography>
          <Button color="inherit" component={Link} href="/docs">Docs</Button>
          <Button color="primary" variant="contained" sx={{ ml: 2 }}>Login</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
        <Box textAlign="center" mb={10}>
          <Typography variant="h1" gutterBottom>
            Welcome to <Box component="span" sx={{ color: 'primary.main' }}>NCS</Box>
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Subscribe to our premium products like CATS CRM, BLESS Crew Alcohol Check, and cutting-edge LLM platforms.
          </Typography>
          <Button variant="contained" size="large" sx={{ mt: 4, mr: 2 }}>
            Get Started
          </Button>
          <Button variant="outlined" size="large" sx={{ mt: 4 }} component={Link} href="/docs">
            View Documentation
          </Button>
        </Box>

        <Grid container spacing={4}>
          {/* CATS Product */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 2 }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2" fontWeight="bold">
                  CATS CRM
                </Typography>
                <Typography color="text.secondary">
                  A powerful CRM module tailored for your business needs. Subscribe, customize, and start managing your customer relations efficiently.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" fullWidth>Subscribe Now</Button>
              </CardActions>
            </Card>
          </Grid>
          
          {/* BLESS Product */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 2 }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2" fontWeight="bold">
                  BLESS
                </Typography>
                <Typography color="text.secondary">
                  Crew Alcohol Check product for crew members. Ensure safety and compliance with our reliable testing software.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" fullWidth color="secondary">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>

          {/* AI Models Product */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 2 }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2" fontWeight="bold">
                  AI & LLM Services
                </Typography>
                <Typography color="text.secondary">
                  Just like AWS Bedrock, access top-tier LLMs for your applications. Install, configure, and use seamlessly.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" fullWidth color="primary">Explore Models</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
