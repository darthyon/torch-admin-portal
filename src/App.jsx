import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopMenu from './components/TopMenu';
import Dashboard from './pages/Dashboard';
import Organizations from './pages/Organizations';
import OrganizationDetails from './pages/OrganizationDetails';
import NewOrganization from './pages/NewOrganization';
import Credits from './pages/Credits';
import AssignCredit from './pages/AssignCredit';
import TopUpCredits from './pages/TopUpCredits';
import AddActivity from './pages/AddActivity';

function App() {
  return (
    <Router>
      <div className="App">
        <TopMenu />
        <main className="torch-main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/organizations" element={<Organizations />} />
            <Route path="/organizations/new" element={<NewOrganization />} />
            <Route path="/organizations/:id" element={<OrganizationDetails />} />
            <Route path="/credits" element={<Credits />} />
            <Route path="/credits/:id" element={<Credits />} />
            <Route path="/credits/:id/manage" element={<Credits />} />
            <Route path="/credits/:id/assign-credit" element={<AssignCredit />} />
            <Route path="/credits/:id/add-activity" element={<AddActivity />} />
            <Route path="/top-up-credits" element={<TopUpCredits />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
