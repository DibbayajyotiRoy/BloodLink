import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './components/AuthContext';
import Layout from './components/Layout';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

// Lazy load components
const LandingPage = React.lazy(() => import('./Landing/page'));
const DonorForm = React.lazy(() => import('./SignUp/UserRegister'));
const BloodBankRegister = React.lazy(() => import('./SignUp/BloodBankRegister'));
const BloodSeekersPage = React.lazy(() => import('./dashboard/BloodSeekers/page'));
const BloodBankDashboard = React.lazy(() => import('./dashboard/bloodBank/page'));
const NotFound = React.lazy(() => import('./components/NotFound'));
const Login = React.lazy(() => import('./login/login'));
const ProfilePage = React.lazy(() => import('./dashboard/ProfilePage/page'));
const BankProfile = React.lazy(() => import('./dashboard/ProfilePage/BankProfile'));
const DonorProfilePage = React.lazy(() => import('./dashboard/ProfilePage/DonorProfile'));
const EligibilityPage = React.lazy(() => import('./SignUp/eligibilityPage'));


// Define route configuration
const routes = [
  { path: '/', element: <LandingPage /> },
  { path: '/register/donor', element: <DonorForm /> },
  { path: '/eligibility', element: <EligibilityPage /> },
  { path: '/register/blood-bank', element: <BloodBankRegister /> },
  { path: '/bloodseekers', element: <BloodSeekersPage /> },
  { path: '/dashboard', element: <BloodBankDashboard /> },
  { path: '/404', element: <NotFound /> },
  { path: '/login', element: <Login /> },
  { path: '/profile', element: <ProfilePage /> },
  { path: '/profile/:id', element: <BankProfile /> },
  { path: '/profile/blooddonor/:id', element: <DonorProfilePage /> },
];

function App() {
  return (
    <AuthProvider>
      <Router>
        <ErrorBoundary>
          <Layout>
            <Toaster position="top-center" />
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                {routes.map((route) => (
                  <Route key={route.path} path={route.path} element={route.element} />
                ))}
                <Route path="*" element={<Navigate replace to="/404" />} />
              </Routes>
            </Suspense>
          </Layout>
        </ErrorBoundary>
      </Router>
    </AuthProvider>
  );
}

export default App;

