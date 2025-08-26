import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SectionCard from '../components/SectionCard';
import DataTable from '../components/DataTable';

const Credits = () => {
  const { id } = useParams(); // Get organization ID from URL if present
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [showOrgDetails, setShowOrgDetails] = useState(false);
  const [anchorToTransactions, setAnchorToTransactions] = useState(false);
  const [activeTab, setActiveTab] = useState('core-services');
  const navigate = useNavigate();

  // Organizations data - memoized to prevent unnecessary re-renders
  const organizations = useMemo(() => [
    {
      id: 615,
      name: "Always Marketing Sdn Bhd",
      purchased: 1500,
      used: 1200,
      remaining: 300,
      currency: "RM",
      location: "Malaysia"
    },
    {
      id: 2,
      name: "Quantum Inventions",
      purchased: 2000,
      used: 1500,
      remaining: 500,
      currency: "$",
      location: "Singapore"
    },
    {
      id: 3,
      name: "Yakult Malaysia",
      purchased: 3000,
      used: 2100,
      remaining: 900,
      currency: "RM",
      location: "Malaysia"
    },
    {
      id: 4,
      name: "SGS",
      purchased: 2500,
      used: 1800,
      remaining: 700,
      currency: "$",
      location: "Singapore"
    },
    {
      id: 5,
      name: "Swisslog",
      purchased: 1800,
      used: 950,
      remaining: 850,
      currency: "$",
      location: "Singapore"
    }
  ], []);

  // Scroll to transactions section when anchorToTransactions is true
  useEffect(() => {
    if (anchorToTransactions && showOrgDetails) {
      const transactionsSection = document.getElementById('transactions-section');
      if (transactionsSection) {
        transactionsSection.scrollIntoView({ behavior: 'smooth' });
        setAnchorToTransactions(false); // Reset after scrolling
      }
    }
  }, [anchorToTransactions, showOrgDetails]);

  // Auto-select organization if ID is provided in URL
  useEffect(() => {
    if (id) {
      const org = organizations.find(org => org.id === parseInt(id));
      if (org) {
        setSelectedOrg(org);
        setShowOrgDetails(true);
      }
    }
  }, [id, organizations]);

  const transactions = [
    {
      id: 1,
      dateTime: "2025-08-25 10:30",
      type: "Top-up",
      amount: 500,
      referenceId: "REF-001",
      status: "Completed"
    },
    {
      id: 2,
      dateTime: "2025-08-24 15:45",
      type: "Allocation",
      amount: -150,
      referenceId: "REF-002",
      status: "Completed"
    },
    {
      id: 3,
      dateTime: "2025-08-23 09:15",
      type: "Allocation",
      amount: -200,
      referenceId: "REF-003",
      status: "Completed"
    },
    {
      id: 4,
      dateTime: "2025-08-22 14:20",
      type: "Top-up",
      amount: 300,
      referenceId: "REF-004",
      status: "Pending"
    }
  ];

  // Core Services Usage Data (User Activity)
  const coreServicesUsage = [
    {
      id: 1,
      employeeName: "John Doe",
      type: "Video",
      startTime: "2025-08-25 10:00",
      endTime: "2025-08-25 11:00",
      bookingId: "BK-001",
      creditsUsed: 2
    },
    {
      id: 2,
      employeeName: "Jane Smith",
      type: "In-person",
      startTime: "2025-08-24 14:00",
      endTime: "2025-08-24 15:30",
      bookingId: "BK-002",
      creditsUsed: 5
    },
    {
      id: 3,
      employeeName: "Mike Johnson",
      type: "Video",
      startTime: "2025-08-23 09:00",
      endTime: "2025-08-23 10:00",
      bookingId: "BK-003",
      creditsUsed: 2
    }
  ];

  // Activation Usage Data (Company Activity)
  const activationUsage = [
    {
      id: 1,
      activity: "Client Onboarding",
      dateTime: "2025-08-25 15:00",
      creditsUsed: 10,
      createdBy: "admin@thoughtfull.world"
    },
    {
      id: 2,
      activity: "Client Launch",
      dateTime: "2025-08-24 10:00",
      creditsUsed: 25,
      createdBy: "admin@thoughtfull.world"
    },
    {
      id: 3,
      activity: "Talks",
      dateTime: "2025-08-23 16:00",
      creditsUsed: 5,
      createdBy: "admin@thoughtfull.world"
    },
    {
      id: 4,
      activity: "Workshops",
      dateTime: "2025-08-22 14:00",
      creditsUsed: 15,
      createdBy: "admin@thoughtfull.world"
    },
    {
      id: 5,
      activity: "Booths",
      dateTime: "2025-08-21 11:00",
      creditsUsed: 20,
      createdBy: "admin@thoughtfull.world"
    },
    {
      id: 6,
      activity: "Pre-recorded",
      dateTime: "2025-08-20 09:00",
      creditsUsed: 8,
      createdBy: "admin@thoughtfull.world"
    }
  ];

  // Organization Credit Usage table configuration
  const columns = [
    { key: 'name', label: 'Org Name' },
    { key: 'purchased', label: 'Purchased Credits' },
    { key: 'used', label: 'Used Credits' },
    { key: 'remaining', label: 'Remaining Credits' }
  ];

  const actions = [
    { type: 'button', label: 'Manage Credit', key: 'manage' },
    { type: 'button', label: 'Transactions', key: 'transactions' }
  ];

  // Transaction table configuration
  const transactionColumns = [
    { key: 'dateTime', label: 'Date / Time' },
    { key: 'type', label: 'Type' },
    { key: 'amount', label: 'Amount' },
    { key: 'referenceId', label: 'Reference ID' },
    { key: 'status', label: 'Status' }
  ];

  // Overall transactions configuration (all organizations)
  const overallTransactions = [
    {
      id: 1,
      orgName: "Always Marketing Sdn Bhd",
      dateTime: "2025-08-25 10:30",
      type: "Top-up",
      amount: 500,
      referenceId: "REF-001",
      status: "Completed"
    },
    {
      id: 2,
      orgName: "Quantum Inventions",
      dateTime: "2025-08-24 15:45",
      type: "Usage",
      amount: -150,
      referenceId: "REF-002",
      status: "Completed"
    },
    {
      id: 3,
      orgName: "Yakult Malaysia",
      dateTime: "2025-08-23 09:15",
      type: "Allocation",
      amount: -200,
      referenceId: "REF-003",
      status: "Completed"
    },
    {
      id: 4,
      orgName: "SGS",
      dateTime: "2025-08-22 14:20",
      type: "Top-up",
      amount: 300,
      referenceId: "REF-004",
      status: "Pending"
    },
    {
      id: 5,
      orgName: "Swisslog",
      dateTime: "2025-08-21 11:30",
      type: "Usage",
      amount: -75,
      referenceId: "REF-005",
      status: "Completed"
    }
  ];

  const overallTransactionColumns = [
    { key: 'orgName', label: 'Organization' },
    { key: 'dateTime', label: 'Date / Time' },
    { key: 'type', label: 'Type' },
    { key: 'amount', label: 'Amount' },
    { key: 'referenceId', label: 'Reference ID' },
    { key: 'status', label: 'Status' }
  ];

  const overallTransactionActions = [
    { type: 'button', label: 'View', key: 'view' }
  ];

  // Core Services Usage columns
  const coreServicesColumns = [
    { key: 'employeeName', label: 'Employee Name' },
    { key: 'type', label: 'Type' },
    { key: 'startTime', label: 'Start Time' },
    { key: 'endTime', label: 'End Time' },
    { key: 'bookingId', label: 'Booking ID' },
    { key: 'creditsUsed', label: 'Credits Used' }
  ];

  // Activation Usage columns
  const activationColumns = [
    { key: 'activity', label: 'Activity' },
    { key: 'dateTime', label: 'Date/Time' },
    { key: 'creditsUsed', label: 'Credits Used' },
    { key: 'createdBy', label: 'Created By' }
  ];

  const handleActionClick = (actionKey, item) => {
    if (actionKey === 'manage') {
      // Navigate to manage credit page with proper URL
      navigate(`/credits/${item.id}/manage`);
    } else {
      setSelectedOrg(item);
      setShowOrgDetails(true);
      // If Transactions button was clicked, anchor to transactions section
      setAnchorToTransactions(actionKey === 'transactions');
    }
  };

  // Note: These functions are kept for future implementation
  // They are currently not used but will be needed for full functionality
  
  // const handleTopUp = () => {
  //   // Top up flow - placeholder for now
  //   console.log('Top up flow triggered');
  // };

  // const handleAssignCredit = () => {
  //   // Calculate total credits to allocate
  //   const totalAllocated = creditAllocation.videoCalls + 
  //                         creditAllocation.inPersonSessions + 
  //                         creditAllocation.webinar + 
  //                         creditAllocation.roadshow + 
  //                         creditAllocation.reporting;
    
  //   // Validate credit allocation
  //   if (totalAllocated > selectedOrg.remaining) {
  //     alert(`Cannot allocate more than ${selectedOrg.remaining} credits. You're trying to allocate ${totalAllocated} credits.`);
  //     return;
  //   }
    
  //   if (totalAllocated === 0) {
  //       alert('Please enter at least one credit amount to allocate.');
  //       return;
  //   }
    
  //   // Update organization credits (in a real app, this would call an API)
  //   const updatedOrg = {
  //     ...selectedOrg,
  //     remaining: selectedOrg.remaining - totalAllocated,
  //     used: selectedOrg.used + totalAllocated
  //   };
    
  //     // Update the selectedOrg state to reflect changes
  //     setSelectedOrg(updatedOrg);
    
  //   // Reset form
  //   setCreditAllocation({
  //     videoCalls: 0,
  //     inPersonSessions: 0,
  //     webinar: 0,
  //     roadshow: 0,
  //     reporting: 0,
  //       notes: ''
  //   });
    
  //   // Show success message
  //     alert(`Successfully allocated ${totalAllocated} credits!`);
  // };

  // const handleInputChange = (field, value) => {
  //   setCreditAllocation(prev => ({
  //     ...prev,
  //     [field]: parseInt(value) || 0
  //   }));
  // };

  // const handleNotesChange = (value) => {
  //     setCreditAllocation(prev => ({
  //       ...prev,
  //       notes: value
  //     }));
  // };

  // const handleUpdateCreditPool = () => {
  //   const newAmount = parseInt(creditPoolAmount);
    
  //   if (!newAmount || newAmount <= 0) {
  //     alert('Please enter a valid credit amount greater than 0.');
  //       return;
  //   }
    
  //   if (newAmount < selectedOrg.used) {
  //     alert(`Cannot set credit pool below used amount (${selectedOrg.used} credits).`);
  //       return;
  //   }
    
  //   // Update organization credits
  //   const updatedOrg = {
  //     ...selectedOrg,
  //     purchased: newAmount,
  //     remaining: newAmount - selectedOrg.used
  //   };
    
  //   // Update the selectedOrg state
  //     setSelectedOrg(updatedOrg);
    
  //   // Reset input
  //     setCreditPoolAmount('');
    
  //   // Show success message
  //     alert(`Credit pool updated successfully! New total: ${newAmount} credits`);
  // };

  // Organization Details Page
  if (showOrgDetails) {
    return (
      <div className="torch-page">
        <div className="torch-container">
          {/* Page Header */}
          <div className="torch-page-header">
            <div className="torch-page-title">
              <h1>Manage Credits - {selectedOrg?.name}</h1>
            </div>
            <div className="torch-page-actions">
              <button 
                className="torch-btn torch-btn-secondary"
                onClick={() => {
                  setShowOrgDetails(false);
                  setSelectedOrg(null);
                  navigate('/credits');
                }}
              >
                Back to Credits
              </button>
            </div>
          </div>
          
          {/* Client Summary Section */}
          <SectionCard title="Client Summary">
            <div style={{ padding: '20px' }}>
              <div className="torch-kpi-row" style={{ marginBottom: '0px' }}>
                <div className="torch-card">
                  <div className="torch-card-header">Total Credits Purchased</div>
                  <div className="torch-card-value">{selectedOrg?.purchased} credits</div>
                  <div className="torch-card-currency">{selectedOrg?.currency === 'RM' ? 'RM' : '$'}{selectedOrg?.currency === 'RM' ? (selectedOrg?.purchased * 3.5).toFixed(2) : (selectedOrg?.purchased * 1.0).toFixed(2)}</div>
                </div>
                <div className="torch-card">
                  <div className="torch-card-header">Used Credits</div>
                  <div className="torch-card-value">{selectedOrg?.used} credits</div>
                  <div className="torch-card-currency">{selectedOrg?.currency === 'RM' ? 'RM' : '$'}{selectedOrg?.currency === 'RM' ? (selectedOrg?.used * 3.5).toFixed(2) : (selectedOrg?.used * 1.0).toFixed(2)}</div>
                </div>
                <div className="torch-card">
                  <div className="torch-card-header">Remaining Credits</div>
                  <div className="torch-card-value">{selectedOrg?.remaining} credits</div>
                  <div className="torch-card-currency">{selectedOrg?.currency === 'RM' ? 'RM' : '$'}{selectedOrg?.currency === 'RM' ? (selectedOrg?.remaining * 3.0).toFixed(2) : (selectedOrg?.remaining * 1.0).toFixed(2)}</div>
                </div>
                <div className="torch-card">
                  <div className="torch-card-header">Utilization %</div>
                  <div className="torch-card-value">{Math.round((selectedOrg?.used / selectedOrg?.purchased) * 100)}%</div>
                  <div className="torch-card-subtitle">Current Usage</div>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Credit Usage Section */}
          <SectionCard 
            title="Credit Usage" 
            actions={
              <div style={{ display: 'flex', gap: '10px' }}>

                <button 
                  className="torch-btn torch-btn-secondary"
                  onClick={() => navigate('/top-up-credits', { 
                    state: { 
                      fromOrgManage: true, 
                      orgId: selectedOrg.id 
                    } 
                  })}
                >
                  Top Up Credit
                </button>
                <button 
                  className="torch-btn"
                  onClick={() => navigate(`/credits/${selectedOrg.id}/assign-credit`)}
                >
                  Assign Credit
                </button>
              </div>
            }
          >
            <div style={{ padding: '20px' }}>
              {/* Credit Pool Progress Bar */}
              <div className="torch-form-group" style={{ marginBottom: '20px' }}>
                <label className="torch-credit-pool-label">Credit Pool Available</label>
                <div className="torch-progress-container">
                  <div className="torch-progress-bar">
                    <div 
                      className="torch-progress-fill" 
                      style={{ width: `${(selectedOrg?.remaining / selectedOrg?.purchased) * 100}%` }}
                    ></div>
                  </div>
                  <span className="torch-credit-amount">
                    {selectedOrg?.remaining} / {selectedOrg?.purchased} credits
                  </span>
                </div>
              </div>

              {/* Tab Buttons */}
              <div className="torch-tab-buttons">
                <button 
                  className={`torch-tab-btn ${activeTab === 'core-services' ? 'torch-tab-active' : ''}`}
                  onClick={() => setActiveTab('core-services')}
                >
                  Core Services Usage (User Activity)
                </button>
                <button 
                  className={`torch-tab-btn ${activeTab === 'activation' ? 'torch-tab-active' : ''}`}
                  onClick={() => setActiveTab('activation')}
                >
                  Activation Usage (Company Activity)
                </button>
              </div>

              {/* Tab Content */}
              <div className="torch-tab-content">
                {activeTab === 'core-services' && (
                  <div>
                    <DataTable
                      data={coreServicesUsage}
                      columns={coreServicesColumns}
                    />
                  </div>
                )}
                
                {activeTab === 'activation' && (
                  <div>
                    <DataTable
                      data={activationUsage}
                      columns={activationColumns}
                    />
                  </div>
                )}
              </div>
            </div>
          </SectionCard>

          {/* Transaction Table Section */}
          <SectionCard title="Transaction Table" id="transactions-section">
            <DataTable
              data={transactions}
              columns={transactionColumns}
              statusFields={['status']}
            />
          </SectionCard>
        </div>
      </div>
    );
  }

  // Main Credits Page
  return (
    <div className="torch-page">
      <div className="torch-container">
        {/* Credit Dashboard Section */}
        <SectionCard title="Credit Dashboard">
          <div style={{ padding: '20px' }}>
            <div className="torch-kpi-row" style={{ marginBottom: '0px' }}>
              <div className="torch-card">
                <div className="torch-card-header">Total Credits Purchased</div>
                <div className="torch-card-value">12,000 credits</div>
                <div className="torch-card-currency">$12,000.00</div>
              </div>
              <div className="torch-card">
                <div className="torch-card-header">Total Credits Used</div>
                <div className="torch-card-value">8,450 credits</div>
                <div className="torch-card-currency">$8,450.00</div>
              </div>
              <div className="torch-card">
                <div className="torch-card-header">Utilization Rate</div>
                <div className="torch-card-value">70%</div>
                <div className="torch-card-subtitle">Current Usage</div>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Organization Credit Usage Table */}
        <SectionCard title="Organization Credit Usage">
          <DataTable
            data={organizations}
            columns={columns}
            actions={actions}
            onActionClick={handleActionClick}
          />
        </SectionCard>

        {/* Overall Transactions Section */}
        <SectionCard title="Overall Transactions">
          <DataTable
            data={overallTransactions}
            columns={overallTransactionColumns}
            actions={overallTransactionActions}
            onActionClick={(actionKey, item) => {
              // For now, just log the action. In a real app, you'd navigate to a new page or modal.
              console.log('View overall transaction clicked for:', item.orgName);
            }}
          />
        </SectionCard>
      </div>
    </div>
  );
};

export default Credits;
