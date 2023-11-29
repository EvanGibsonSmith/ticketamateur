import './App.css';
import {BrowserRouter as Router, Switch, Route, Routes, Link,} from "react-router-dom";
import Consumer from './ConsumerPage';
import Admin from './AdminPage';
import VenueManager from './VenueManagerPage';
import Authenticate from './AuthenticatePage';
import React from 'react';

function App() {
  return (
    <div>
          <Routes>
              <Route
                  exact
                  path="/"
                  element={<Authenticate/>}
              />

              <Route
                  exact
                  path="/admin"
                  element={<Admin/>}
              />

              <Route
                  exact
                  path="/venuemanager"
                  element={<VenueManager/>}
              />

              <Route
                  exact
                  path="/consumer"
                  element={<Consumer/>}
              />
          </Routes>
    </div>
  );
}

export default App;