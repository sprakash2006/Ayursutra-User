import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Profile from './pages/Profile';
import Booking from './pages/Booking';
import Centres from './pages/Centres';
import Notifications from './pages/Notifications';
import AncientKnowledge from './pages/AncientKnowledge';
import NotFound from './pages/NotFound';
import Login from './pages/login';

import PrivateRoute from './protectedRoute'

const App = () => {
  return (
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/booking" element={<PrivateRoute><Booking /></PrivateRoute>} />
          <Route path="/centres" element={<Centres />} />
          <Route path="/login" element={<Login />} />
          <Route path="/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
          <Route path="/ancient-knowledge" element={<AncientKnowledge />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  );
};

export default App;
