import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { BookingProvider } from '@/context/BookingContext';
import { AuthProvider } from '@/context/AuthContext';
import { DiscoveryProvider } from '@/context/DiscoveryContext';

// Lazy Imports for Performance
const HomeView = lazy(() => import('@/features/discovery/HomeView'));
const MapView = lazy(() => import('@/features/discovery/MapView'));
const ARView = lazy(() => import('@/features/ar/ARView'));
const SafetyView = lazy(() => import('@/features/safety/SafetyView'));
const TransportView = lazy(() => import('@/features/transport/TransportView'));
const ProfileView = lazy(() => import('@/features/user/ProfileView'));
const DestinationDetailView = lazy(() => import('@/features/discovery/DestinationDetailView'));
const NotFoundView = lazy(() => import('@/features/discovery/NotFoundView'));
const AICompanion = lazy(() => import('@/features/ai/AICompanion'));

// Admin Lazy Imports
const AdminLayout = lazy(() => import('@/features/admin/AdminLayout'));
const AdminLoginView = lazy(() => import('@/features/admin/LoginView'));
const DashboardView = lazy(() => import('@/features/admin/DashboardView'));
const DestinationsView = lazy(() => import('@/features/admin/DestinationsView'));

// Auth Lazy Imports
const LoginView = lazy(() => import('@/features/auth/LoginView'));
const SignupView = lazy(() => import('@/features/auth/SignupView'));

// Loading Fallback Component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      <p className="text-gray-500 font-medium animate-pulse">Loading Experience...</p>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <DiscoveryProvider>
        <BookingProvider>
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <AICompanion />
              <Routes>
                {/* Main Application Routes */}
                <Route element={<AppLayout />}>
                  <Route path="/" element={<HomeView />} />
                  <Route path="/destination/:id" element={<DestinationDetailView />} />
                  <Route path="/map" element={<MapView />} />
                  <Route path="/ar" element={<ARView />} />
                  <Route path="/safety" element={<SafetyView />} />
                  <Route path="/transport" element={<TransportView />} />
                  <Route path="/profile" element={<ProfileView />} />
                  <Route path="*" element={<NotFoundView />} />
                </Route>

                {/* Authentication Routes */}
                <Route path="/login" element={<LoginView />} />
                <Route path="/signup" element={<SignupView />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<DashboardView />} />
                  <Route path="login" element={<AdminLoginView />} />
                  <Route path="destinations" element={<DestinationsView />} />
                  <Route path="*" element={<div>Admin 404</div>} />
                </Route>

                <Route path="*" element={<NotFoundView />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </BookingProvider>
      </DiscoveryProvider>
    </AuthProvider>
  )
}

export default App
