import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

// Lazy load components
const LandingPage = React.lazy(() => import('./dashboard/landing/page'));
const DonorForm = React.lazy(() => import('./pages/UserRegister'));
const BloodBankRegister = React.lazy(() => import('./pages/BloodBankRegister'));
const BloodSeekersPage = React.lazy(() => import('./dashboard/BloodSeekers/page'));
const NotFound = React.lazy(() => import('./components/NotFound'));

// Define route configuration
const routes = [
  { path: '/', element: <LandingPage /> },
  { path: '/register/donor', element: <DonorForm /> },
  { path: '/register/blood-bank', element: <BloodBankRegister /> },
  { path: '/bloodseekers', element: <BloodSeekersPage /> },
  { path: '/404', element: <NotFound /> },
  { path: '*', element: <Navigate replace to="/404" /> },
];

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Layout>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {routes.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))}
            </Routes>
          </Suspense>
        </Layout>
      </ErrorBoundary>
    </Router>
  );
}

export default App;