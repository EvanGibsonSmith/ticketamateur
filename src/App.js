import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Consumer from './ConsumerPage';
import Admin from './AdminPage';
import VenueManager from './VenueManagerPage';
import Authenticate from './AuthenticatePage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/authenticate" />} />
        <Route path="/authenticate" element={<Authenticate />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/venuemanager" element={<VenueManager />} />
        <Route path="/consumer" element={<Consumer />} />
      </Routes>
    </div>
  );
}

export default App;