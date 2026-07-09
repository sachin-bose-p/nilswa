'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Link from 'next/link';

export default function Docs() {
  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            NILSWA Documentation
          </Typography>
          <Button color="inherit" component={Link} href="/">Home</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
          Help & Documentation
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
          Learn how to subscribe, configure, and use Nilswa Cloud Services products.
        </Typography>

        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" gutterBottom>
            Airline Crew Module
          </Typography>
          <Accordion sx={{ mb: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: "bold" }}>How to subscribe to Airline Crew?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">
                To subscribe to Airline Crew, navigate to the Home page, click on "Subscribe Now" under the Airline Crew section, and choose your preferred billing cycle (monthly or yearly). Your dedicated CRM instance will be provisioned automatically on a separate EC2 server.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ mb: 4 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: "bold" }}>How to customize my Airline Crew instance?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">
                Once subscribed, you will receive admin credentials. Log into your Airline Crew dashboard to customize modules, fields, and user roles according to your business needs.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Typography variant="h5" gutterBottom>
            Alcohol Check System
          </Typography>
          <Accordion sx={{ mb: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: "bold" }}>Setting up Alcohol Check System for your crew</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">
                After purchasing a Alcohol Check System subscription, download the client app onto your crew devices. Use the API key generated in your NCS Console to connect the devices to our cloud platform for real-time monitoring.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ mb: 4 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: "bold" }}>Compliance Reporting</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">
                Alcohol Check System automatically generates monthly compliance reports. You can download these as PDFs directly from your NCS Console under the "Reports" tab.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Typography variant="h5" gutterBottom>
            Real Estate CRM
          </Typography>
          <Accordion sx={{ mb: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: "bold" }}>Managing Properties and the Customer Portal</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">
                The Real Estate CRM module provides a comprehensive suite to manage your listings and agents. Agents can log into the dedicated Agent Portal to update listings, track leads, and view dashboard analytics. Your clients can access the customized Customer Portal to browse available properties, schedule viewings, and communicate directly with their assigned agents.
              </Typography>
            </AccordionDetails>
          </Accordion>

        </Box>
      </Container>
    </Box>
  );
}
