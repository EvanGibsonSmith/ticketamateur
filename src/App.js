import './App.css';
import {BrowserRouter as Router, Switch, Route, Routes, Link,} from "react-router-dom";
import Consumer from './ConsumerPage';
import Admin from './AdministratorPage';
import VenueManager from './VenueManagerPage';
import Authenticate from './AuthenticatePage';
import CreateVenue from './createVenuePage';
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

              <Route
                  exact
                  path="/createvenue"
                  element={<CreateVenue/>}
              />
          </Routes>
    </div>
  );
}

export default App;