import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Consumer from './Consumer';
import Admin from './Admin';
import VenueManager from './VenueManager';
import Authenticate from './Authenticate';

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