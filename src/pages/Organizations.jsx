import React from 'react';
import { useNavigate } from 'react-router-dom';
import SectionCard from '../components/SectionCard';
import DataTable from '../components/DataTable';

const Organizations = () => {
  const navigate = useNavigate();
  
  const organizations = [
    {
      id: 615,
      name: "Always Marketing Sdn Bhd",
      corporatePass: "TFAMKT",
      validDomains: "alwaysmkt.com.my",
      enabled: true,
      aiaCs: false,
      prospects: false
    },
    {
      id: 613,
      name: "PLZ REUSE THIS",
      corporatePass: "ASDASDSA",
      validDomains: "aaa.com",
      enabled: true,
      aiaCs: true,
      prospects: false
    },
    {
      id: 612,
      name: "Quantum Inventions",
      corporatePass: "TFCQI",
      validDomains: "quantuminventions.com",
      enabled: true,
      aiaCs: false,
      prospects: true
    },
    {
      id: 611,
      name: "Yakult Malaysia",
      corporatePass: "TFYKT",
      validDomains: "yakult.com.my",
      enabled: true,
      aiaCs: false,
      prospects: false
    },
    {
      id: 610,
      name: "SGS",
      corporatePass: "TFSGS",
      validDomains: "sgs.com",
      enabled: true,
      aiaCs: false,
      prospects: false
    },
    {
      id: 609,
      name: "Swisslog",
      corporatePass: "TFSWISS",
      validDomains: "swisslog.com",
      enabled: true,
      aiaCs: false,
      prospects: false
    },
    {
      id: 608,
      name: "Seatrium",
      corporatePass: "TFSEA",
      validDomains: "seatrium.com",
      enabled: true,
      aiaCs: false,
      prospects: false
    },
    {
      id: 607,
      name: "FRANKLIN TEMPLETON ASSET MANAGEMENT (M) SDN BHD",
      corporatePass: "TFCFTA",
      validDomains: "franklintempleton.com",
      enabled: true,
      aiaCs: false,
      prospects: false
    },
    {
      id: 606,
      name: "Air Selangor",
      corporatePass: "TFAIR",
      validDomains: "airselangor.com",
      enabled: false,
      aiaCs: true,
      prospects: false
    }
  ];

  // Table configuration
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'corporatePass', label: 'Corporate Pass' },
    { key: 'validDomains', label: 'Valid Email Domains' },
    { key: 'enabled', label: 'Enabled' },
    { key: 'aiaCs', label: 'AIA CS' },
    { key: 'prospects', label: 'Prospects' }
  ];

  const actions = [
    { type: 'link', label: 'Show', href: (item) => `/organizations/${item.id}` },
    { type: 'link', label: 'Edit', href: (item) => `/organizations/${item.id}` },
    { type: 'button', label: 'TFI', key: 'tfi' },
    { type: 'button', label: 'Deals', key: 'deals' }
  ];

  const statusFields = ['enabled', 'aiaCs', 'prospects'];

  const handleActionClick = (actionKey, item) => {
    console.log(`${actionKey} clicked for item:`, item);
    // Handle action clicks here
  };

  return (
    <div className="torch-page">
      <div className="torch-container">
        {/* Page Header */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
          <button 
            className="torch-btn torch-btn-secondary"
            onClick={() => navigate('/organizations/new')}
          >
            New Organization
          </button>
        </div>

        <div style={{ display: 'flex', gap: '35px' }}>
          {/* Main Content - Table (takes remaining width) */}
          <section style={{ flex: 1 }}>
            <SectionCard title="Organizations">
              <DataTable
                data={organizations}
                columns={columns}
                actions={actions}
                statusFields={statusFields}
                onActionClick={handleActionClick}
              />
            </SectionCard>
          </section>

          {/* Right Sidebar - Filters */}
          <section style={{ width: '300px', flexShrink: 0 }}>
            <div className="torch-filters">
              <h3>Find Organizations</h3>
              
              <div className="field">
                <label>Organization ID</label>
                <select>
                  <option>Equals</option>
                </select>
                <input type="text" placeholder="Enter ID" />
              </div>

              <div className="field">
                <label>Name</label>
                <select>
                  <option>Contains</option>
                </select>
                <input type="text" placeholder="Enter name" />
              </div>

              <div className="field">
                <label>Valid Email Domains</label>
                <select>
                  <option>Contains</option>
                </select>
                <input type="text" placeholder="Enter domain" />
              </div>

              <div className="field">
                <label>Corporate Pass</label>
                <select>
                  <option>Contains</option>
                </select>
                <input type="text" placeholder="Enter pass" />
              </div>

              <div className="field">
                <label>AIA_CS</label>
                <select>
                  <option>---Choose---</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>

              <button>Search</button>
              <button 
                type="button" 
                className="torch-btn-link"
                onClick={() => {
                  // Clear filters logic here
                  console.log('Clear filters clicked');
                }}
              >
                Clear Filters
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Organizations;
