import React, { useState } from 'react';
import SectionCard from '../components/SectionCard';
import DataTable from '../components/DataTable';

const OrganizationDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  const organization = {
    id: 615,
    inserted: "14 Aug 2025, 17:54",
    name: "Always Marketing Sdn Bhd",
    enabled: true,
    checkEmailDomain: "Yes",
    validDomains: "alwaysmkt.com.my",
    corporatePass: "TFAMKT",
    maxSeats: "Unlimited",
    createdBy: "lock.ng@thoughtfull.world",
    terminationDate: "",
    status: "active",
    enableCuratedProviders: false,
    isAvailableWorldwide: false,
    landingPageUrl: "",
    allowCountries: "Malaysia",
    allowedProfessionalFromAnyCountry: false,
    allowedCountriesForProfessional: "Malaysia",
    creditAmount: 1500
  };

  const deals = [
    {
      id: 1,
      title: "Q1 Marketing Campaign",
      creditAssigned: 500,
      creditUsed: 350,
      percentUsed: 70,
      status: "Active"
    },
    {
      id: 2,
      title: "Brand Awareness Initiative",
      creditAssigned: 300,
      creditUsed: 180,
      percentUsed: 60,
      status: "Active"
    },
    {
      id: 3,
      title: "Digital Transformation Project",
      creditAssigned: 700,
      creditUsed: 420,
      percentUsed: 60,
      status: "Completed"
    }
  ];

  // Deals table configuration
  const dealsColumns = [
    { key: 'id', label: 'Deal ID' },
    { key: 'title', label: 'Deal Name' },
    { key: 'creditAssigned', label: 'Credit Assigned' },
    { key: 'creditUsed', label: 'Credit Used' },
    { key: 'percentUsed', label: '% Used' },
    { key: 'status', label: 'Status' }
  ];

  const dealsActions = [
    { type: 'link', label: 'View', href: (item) => `/deals/${item.id}` },
    { type: 'link', label: 'Edit', href: (item) => `/deals/${item.id}/edit` }
  ];

  const statusFields = ['status'];

  const renderField = (label, value, type = 'text') => {
    if (isEditing) {
      switch (type) {
        case 'select':
          return (
            <select defaultValue={value}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          );
        case 'textarea':
          return <textarea defaultValue={value} rows="3" />;
        default:
          return <input type={type} defaultValue={value} />;
      }
    }
    return <span className="torch-field-value">{value || '-'}</span>;
  };

  return (
    <div className="torch-page">
      <div className="torch-container">
        {/* Organization Information Section */}
        <SectionCard 
          title="Organization Information"
          actions={
            <button 
              className="torch-btn torch-btn-secondary"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Save' : 'Edit'}
            </button>
          }
        >
          <div className="torch-form-grid">
            <div className="torch-form-group">
              <label>ID:</label>
              {renderField('ID', organization.id, 'text')}
            </div>
            
            <div className="torch-form-group">
              <label>Inserted:</label>
              {renderField('Inserted', organization.inserted, 'text')}
            </div>
            
            <div className="torch-form-group">
              <label>Name:</label>
              {renderField('Name', organization.name, 'text')}
            </div>
            
            <div className="torch-form-group">
              <label>Enabled:</label>
              {renderField('Enabled', organization.enabled, 'select')}
            </div>
            
            <div className="torch-form-group">
              <label>Check email domain:</label>
              {renderField('Check email domain', organization.checkEmailDomain, 'text')}
            </div>
            
            <div className="torch-form-group">
              <label>Valid email domains:</label>
              {renderField('Valid email domains', organization.validDomains, 'text')}
            </div>
            
            <div className="torch-form-group">
              <label>Corporate Pass:</label>
              {renderField('Corporate Pass', organization.corporatePass, 'text')}
            </div>
            
            <div className="torch-form-group">
              <label>Maximum seats:</label>
              {renderField('Maximum seats', organization.maxSeats, 'text')}
            </div>
            
            <div className="torch-form-group">
              <label>Created by:</label>
              {renderField('Created by', organization.createdBy, 'text')}
            </div>
            
            <div className="torch-form-group">
              <label>Termination date:</label>
              {renderField('Termination date', organization.terminationDate, 'text')}
            </div>
            
            <div className="torch-form-group">
              <label>Status:</label>
              {renderField('Status', organization.status, 'text')}
            </div>
            
            <div className="torch-form-group">
              <label>Enable curated providers list:</label>
              {renderField('Enable curated providers list', organization.enableCuratedProviders, 'select')}
            </div>
            
            <div className="torch-form-group">
              <label>Is available worldwide:</label>
              {renderField('Is available worldwide', organization.isAvailableWorldwide, 'select')}
            </div>
            
            <div className="torch-form-group">
              <label>Landing page URL:</label>
              {renderField('Landing page URL', organization.landingPageUrl, 'text')}
            </div>
            
            <div className="torch-form-group">
              <label>Allow countries:</label>
              {renderField('Allow countries', organization.allowCountries, 'text')}
            </div>
            
            <div className="torch-form-group">
              <label>Allowed professional from any country:</label>
              {renderField('Allowed professional from any country', organization.allowedProfessionalFromAnyCountry, 'select')}
            </div>
            
            <div className="torch-form-group">
              <label>Allowed countries for professional:</label>
              {renderField('Allowed countries for professional', organization.allowedCountriesForProfessional, 'text')}
            </div>
            
            <div className="torch-form-group">
              <label>Credit Amount:</label>
              {renderField('Credit Amount', organization.creditAmount, 'number')}
            </div>
          </div>
        </SectionCard>

        {/* Deals Section */}
        <SectionCard title="Deals">
          <DataTable
            data={deals}
            columns={dealsColumns}
            actions={dealsActions}
            statusFields={statusFields}
          />
        </SectionCard>
      </div>
    </div>
  );
};

export default OrganizationDetails;
