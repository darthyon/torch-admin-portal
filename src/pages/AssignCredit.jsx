import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SectionCard from '../components/SectionCard';

const AssignCredit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [organization, setOrganization] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [creditAllocation, setCreditAllocation] = useState({
    videoCalls: 0,
    inPersonSessions: 0,
    clientOnboarding: 0,
    clientLaunch: 0,
    talks: 0,
    workshops: 0,
    booths: 0,
    preRecorded: 0,
    notes: ''
  });

  // Mock organization data - in real app, fetch from API
  useEffect(() => {
    // Simulate fetching organization data
    const orgData = {
      id: parseInt(id),
      name: "Always Marketing Sdn Bhd",
      purchased: 1500,
      used: 1200,
      remaining: 300
    };
    setOrganization(orgData);
  }, [id]);

  const handleInputChange = (field, value) => {
    setCreditAllocation(prev => ({
      ...prev,
      [field]: parseInt(value) || 0
    }));
  };

  const handleNotesChange = (value) => {
    setCreditAllocation(prev => ({
      ...prev,
      notes: value
    }));
  };

  const resetForm = () => {
    setCreditAllocation({
      videoCalls: 0,
      inPersonSessions: 0,
      clientOnboarding: 0,
      clientLaunch: 0,
      talks: 0,
      workshops: 0,
      booths: 0,
      preRecorded: 0,
      notes: ''
    });
  };

  const handleEditToggle = () => {
    if (isEditMode) {
      // If canceling edit, reset form to original values
      resetForm();
    }
    setIsEditMode(!isEditMode);
  };

  const handleAssignCredit = () => {
    // Calculate total credits to allocate
    const totalAllocated = creditAllocation.videoCalls + 
                          creditAllocation.inPersonSessions + 
                          creditAllocation.clientOnboarding + 
                          creditAllocation.clientLaunch + 
                          creditAllocation.talks + 
                          creditAllocation.workshops + 
                          creditAllocation.booths + 
                          creditAllocation.preRecorded;
    
    // Validate credit allocation
    if (totalAllocated > organization.remaining) {
      alert(`Cannot allocate more than ${organization.remaining} credits. You're trying to allocate ${totalAllocated} credits.`);
      return;
    }
    
    if (totalAllocated === 0) {
      alert('Please enter at least one credit amount to allocate.');
      return;
    }
    
    // Update organization credits (in a real app, this would call an API)
    const updatedOrg = {
      ...organization,
      remaining: organization.remaining - totalAllocated,
      used: organization.used + totalAllocated
    };
    
    // Update the organization state to reflect changes
    setOrganization(updatedOrg);
    
    // Exit edit mode to show the saved values
    setIsEditMode(false);
    
    // Show success message
    alert(`Successfully allocated ${totalAllocated} credits!`);
  };

  if (!organization) {
    return <div>Loading...</div>;
  }

  return (
    <div className="torch-container">
      {/* Page Header */}
      <div className="torch-page-header">
        <div className="torch-page-title">
          <h1>Assign Credit - {organization.name}</h1>
        </div>
        <div className="torch-page-actions">
          <button 
            className="torch-btn torch-btn-secondary"
            onClick={() => navigate(`/credits/${id}`)}
          >
            Back to Manage Credit
          </button>
        </div>
      </div>

      {/* Assign Credit Section */}
      <SectionCard 
        title="Assign Credit" 
        actions={
          <button 
            className="torch-btn torch-btn-secondary"
            onClick={handleEditToggle}
          >
            {isEditMode ? 'Cancel' : 'Edit'}
          </button>
        }
      >
        <div style={{ padding: '20px' }}>
          <div className="torch-form-section">
            <h4>Core Services Allocation</h4>
            <div className="torch-form-group">
              <label className="torch-form-label">Video Calls:</label>
              {isEditMode ? (
                <input 
                  type="number" 
                  placeholder="Enter credits"
                  value={creditAllocation.videoCalls}
                  onChange={(e) => handleInputChange('videoCalls', e.target.value)}
                />
              ) : (
                <div className="torch-view-value">{creditAllocation.videoCalls} credits</div>
              )}
            </div>
            <div className="torch-form-group">
              <label className="torch-form-label">In-Person Sessions:</label>
              {isEditMode ? (
                <input 
                  type="number" 
                  placeholder="Enter credits"
                  value={creditAllocation.inPersonSessions}
                  onChange={(e) => handleInputChange('inPersonSessions', e.target.value)}
                />
              ) : (
                <div className="torch-view-value">{creditAllocation.inPersonSessions} credits</div>
              )}
            </div>
          </div>

          <div className="torch-form-section">
            <h4>Activation Allocation</h4>
            <div className="torch-form-group">
              <label className="torch-form-label">Client Onboarding:</label>
              {isEditMode ? (
                <input 
                  type="number" 
                  placeholder="Enter credits"
                  value={creditAllocation.clientOnboarding}
                  onChange={(e) => handleInputChange('clientOnboarding', e.target.value)}
                />
              ) : (
                <div className="torch-view-value">{creditAllocation.clientOnboarding} credits</div>
              )}
            </div>
            <div className="torch-form-group">
              <label className="torch-form-label">Client Launch:</label>
              {isEditMode ? (
                <input 
                  type="number" 
                  placeholder="Enter credits"
                  value={creditAllocation.clientLaunch}
                  onChange={(e) => handleInputChange('clientLaunch', e.target.value)}
                />
              ) : (
                <div className="torch-view-value">{creditAllocation.clientLaunch} credits</div>
              )}
            </div>
            <div className="torch-form-group">
              <label className="torch-form-label">Talks:</label>
              {isEditMode ? (
                <input 
                  type="number" 
                  placeholder="Enter credits"
                  value={creditAllocation.talks}
                  onChange={(e) => handleInputChange('talks', e.target.value)}
                />
              ) : (
                <div className="torch-view-value">{creditAllocation.talks} credits</div>
              )}
            </div>
            <div className="torch-form-group">
              <label className="torch-form-label">Workshops:</label>
              {isEditMode ? (
                <input 
                  type="number" 
                  placeholder="Enter credits"
                  value={creditAllocation.workshops}
                  onChange={(e) => handleInputChange('workshops', e.target.value)}
                />
              ) : (
                <div className="torch-view-value">{creditAllocation.workshops} credits</div>
              )}
            </div>
            <div className="torch-form-group">
              <label className="torch-form-label">Booths:</label>
              {isEditMode ? (
                <input 
                  type="number" 
                  placeholder="Enter credits"
                  value={creditAllocation.booths}
                  onChange={(e) => handleInputChange('booths', e.target.value)}
                />
              ) : (
                <div className="torch-view-value">{creditAllocation.booths} credits</div>
              )}
            </div>
            <div className="torch-form-group">
              <label className="torch-form-label">Pre-recorded:</label>
              {isEditMode ? (
                <input 
                  type="number" 
                  placeholder="Enter credits"
                  value={creditAllocation.preRecorded}
                  onChange={(e) => handleInputChange('preRecorded', e.target.value)}
                />
              ) : (
                <div className="torch-view-value">{creditAllocation.preRecorded} credits</div>
              )}
            </div>
          </div>

          <div className="torch-form-group">
            <label className="torch-form-label">Notes / Reference:</label>
            {isEditMode ? (
              <textarea 
                placeholder="Optional notes" 
                rows="3"
                value={creditAllocation.notes}
                onChange={(e) => handleNotesChange(e.target.value)}
              />
            ) : (
              <div className="torch-view-value">{creditAllocation.notes || 'No notes'}</div>
            )}
          </div>

          {isEditMode && (
            <div className="torch-form-actions">
              <button 
                className="torch-btn"
                onClick={handleAssignCredit}
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </SectionCard>
    </div>
  );
};

export default AssignCredit;
