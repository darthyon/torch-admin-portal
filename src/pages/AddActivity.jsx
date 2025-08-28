import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SectionCard from '../components/SectionCard';

const AddActivity = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activityData, setActivityData] = useState({
    activity: '',
    startDate: '',
    endDate: '',
    creditsUsed: ''
  });

  // Activity options from the activation list
  const activityOptions = [
    'Client Onboarding',
    'Client Launch',
    'Talks',
    'Workshops',
    'Booths',
    'Pre-recorded'
  ];

  const handleInputChange = (field, value) => {
    setActivityData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Validate form
    if (!activityData.activity || !activityData.startDate || !activityData.endDate || !activityData.creditsUsed) {
      alert('Please fill in all fields');
      return;
    }

    if (parseInt(activityData.creditsUsed) <= 0) {
      alert('Credits used must be greater than 0');
      return;
    }

    // In a real app, this would call an API to save the activity
    // For now, we'll just navigate back to the manage credit page
    console.log('Saving activity:', activityData);
    
    // Show success message
    alert('Activity saved successfully!');
    
    // Navigate back to manage credit page
    navigate(`/credits/${id}/manage`);
  };

  const handleCancel = () => {
    navigate(`/credits/${id}/manage`);
  };

  return (
    <div className="torch-page">
      <div className="torch-container">
        {/* Page Header */}
        <div className="torch-page-header">
          <div className="torch-page-title">
            <h1>Add Activity</h1>
          </div>
          <div className="torch-page-actions">
            <button 
              className="torch-btn torch-btn-secondary"
              onClick={handleCancel}
            >
              Back to Manage Credit
            </button>
          </div>
        </div>

        {/* Activity Details Form */}
        <SectionCard title="Activity Details">
          <div style={{ padding: '20px' }}>
            <div className="torch-form-grid">
              <div className="torch-form-group">
                <label>Select Activity *</label>
                <select 
                  value={activityData.activity}
                  onChange={(e) => handleInputChange('activity', e.target.value)}
                >
                  <option value="">--- Choose Activity ---</option>
                  {activityOptions.map((activity, index) => (
                    <option key={index} value={activity}>
                      {activity}
                    </option>
                  ))}
                </select>
              </div>

              <div className="torch-form-group">
                <label>Start Date *</label>
                <input 
                  type="date" 
                  value={activityData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                />
              </div>

              <div className="torch-form-group">
                <label>End Date *</label>
                <input 
                  type="date" 
                  value={activityData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                />
              </div>

              <div className="torch-form-group">
                <label>Credits Used *</label>
                <input 
                  type="number" 
                  value={activityData.creditsUsed}
                  onChange={(e) => handleInputChange('creditsUsed', e.target.value)}
                  placeholder="Enter credits used"
                  min="1"
                />
              </div>
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
                Save Activity
              </button>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

export default AddActivity;
