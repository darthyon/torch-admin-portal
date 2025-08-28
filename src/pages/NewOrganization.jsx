import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionCard from '../components/SectionCard';

const NewOrganization = () => {
  const navigate = useNavigate();
  const [organizationData, setOrganizationData] = useState({
    name: '',
    corporatePass: '',
    validDomains: '',
    enabled: true,
    checkEmailDomain: 'Yes',
    maxSeats: 'Unlimited',
    enableCuratedProviders: false,
    isAvailableWorldwide: false,
    landingPageUrl: '',
    allowCountries: 'Malaysia',
    allowedProfessionalFromAnyCountry: false,
    allowedCountriesForProfessional: 'Malaysia',
    initialCreditAmount: ''
  });

  const handleInputChange = (field, value) => {
    setOrganizationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Validate required fields
    if (!organizationData.name || !organizationData.corporatePass || !organizationData.validDomains || !organizationData.initialCreditAmount) {
      alert('Please fill in all required fields');
      return;
    }

    if (parseInt(organizationData.initialCreditAmount) <= 0) {
      alert('Initial Credit Amount must be greater than 0');
      return;
    }

    // In a real app, this would call an API to create the organization
    console.log('Creating organization:', organizationData);
    
    // Show success message
    alert('Organization created successfully!');
    
    // Navigate back to organizations list
    navigate('/organizations');
  };

  const handleCancel = () => {
    navigate('/organizations');
  };

  const renderField = (label, field, type = 'text', required = false) => {
    return (
      <div className="torch-form-group">
        <label>{label} {required && '*'}</label>
        {type === 'select' ? (
          <select 
            value={organizationData[field]}
            onChange={(e) => handleInputChange(field, e.target.value)}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        ) : type === 'textarea' ? (
          <textarea 
            value={organizationData[field]}
            onChange={(e) => handleInputChange(field, e.target.value)}
            rows="3"
          />
        ) : (
          <input 
            type={type}
            value={organizationData[field]}
            onChange={(e) => handleInputChange(field, e.target.value)}
            placeholder={type === 'number' ? 'Enter amount' : ''}
            min={type === 'number' ? '1' : undefined}
          />
        )}
      </div>
    );
  };

  return (
    <div className="torch-page">
      <div className="torch-container">
        {/* Page Header */}
        <div className="torch-page-header">
          <div className="torch-page-title">
            <h1>New Organization</h1>
          </div>
          <div className="torch-page-actions">
            <button 
              className="torch-btn torch-btn-secondary"
              onClick={handleCancel}
            >
              Back to Organizations
            </button>
          </div>
        </div>

        {/* Organization Information Form */}
        <SectionCard title="Organization Information">
          <div className="torch-form-grid">
            {renderField('Name', 'name', 'text', true)}
            {renderField('Corporate Pass', 'corporatePass', 'text', true)}
            {renderField('Valid Email Domains', 'validDomains', 'text', true)}
            {renderField('Enabled', 'enabled', 'select')}
            {renderField('Check email domain', 'checkEmailDomain', 'text')}
            {renderField('Maximum seats', 'maxSeats', 'text')}
            {renderField('Enable curated providers list', 'enableCuratedProviders', 'select')}
            {renderField('Is available worldwide', 'isAvailableWorldwide', 'select')}
            {renderField('Landing page URL', 'landingPageUrl', 'text')}
            {renderField('Allow countries', 'allowCountries', 'text')}
            {renderField('Allowed professional from any country', 'allowedProfessionalFromAnyCountry', 'select')}
            {renderField('Allowed countries for professional', 'allowedCountriesForProfessional', 'text')}
            {renderField('Initial Credit Amount', 'initialCreditAmount', 'number', true)}
          </div>

          {/* Action Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '10px', 
            marginTop: '30px',
            justifyContent: 'flex-end'
          }}>
            <button 
              className="torch-btn torch-btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button 
              className="torch-btn"
              onClick={handleSave}
            >
              Create Organization
            </button>
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

export default NewOrganization;
