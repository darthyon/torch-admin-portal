import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SectionCard from '../components/SectionCard';

const TopUpCredits = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [paymentLink, setPaymentLink] = useState('');
  const [showToast, setShowToast] = useState(false);

  const packages = [
    {
      id: 'basic',
      name: 'Basic Package',
      credits: 1000,
      price: 1000,
      currency: '$',
      disclaimer: 'Equivalent to 1000 video calls, 500 in person appointments'
    },
    {
      id: 'professional',
      name: 'Professional Package',
      credits: 2500,
      price: 2250,
      currency: '$',
      disclaimer: 'Equivalent to 2500 video calls, 1250 in person appointments'
    },
    {
      id: 'enterprise',
      name: 'Enterprise Package',
      credits: 5000,
      price: 4000,
      currency: '$',
      disclaimer: 'Equivalent to 5000 video calls, 2500 in person appointments'
    },
    {
      id: 'custom',
      name: 'Custom Amount',
      credits: 0,
      price: 0,
      currency: '$',
      disclaimer: 'Enter your desired credit amount',
      isCustom: true
    }
  ];

  const handlePackageSelect = (packageId) => {
    setSelectedPackage(packageId);
    if (packageId !== 'custom') {
      setCustomAmount('');
    }
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    setCustomAmount(value);
    if (value && !isNaN(value) && parseInt(value) > 0) {
      setSelectedPackage('custom');
    }
  };

  const handleBackNavigation = () => {
    // Check if we came from a specific organization's manage credit page
    if (location.state?.fromOrgManage) {
      navigate(`/credits/${location.state.orgId}/manage`);
    } else {
      // Fallback to general credits page
      navigate('/credits');
    }
  };

  const handleGeneratePaymentLink = async () => {
    if (!selectedPackage) {
      alert('Please select a package first');
      return;
    }

    if (selectedPackage === 'custom' && (!customAmount || parseInt(customAmount) <= 0)) {
      alert('Please enter a valid custom credit amount');
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const selectedPkg = packages.find(pkg => pkg.id === selectedPackage);
      const credits = selectedPackage === 'custom' ? parseInt(customAmount) : selectedPkg.credits;
      const generatedLink = `https://payment.torch.com/checkout/${selectedPkg.id}-${credits}-${Date.now()}`;
      setPaymentLink(generatedLink);
      setIsGenerating(false);
    }, 2000);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(paymentLink);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="torch-page">
      <div className="torch-container">
        {/* Page Header */}
        <div className="torch-page-header">
          <div className="torch-page-title">
            <h1>Top Up Credits</h1>
          </div>
          <div className="torch-page-actions">
            <button 
              className="torch-btn torch-btn-secondary"
              onClick={handleBackNavigation}
            >
              Back to Manage Credits
            </button>
          </div>
        </div>

        {/* Package & Pricing Section */}
        <SectionCard title="Package & Pricing">
          <div style={{ padding: '20px' }}>
            <div className="torch-package-grid">
              {packages.map((pkg) => (
                <div 
                  key={pkg.id}
                  className={`torch-package-card ${selectedPackage === pkg.id ? 'torch-package-selected' : ''}`}
                  onClick={() => handlePackageSelect(pkg.id)}
                >
                  <div className="torch-package-header">
                    <h3>{pkg.name}</h3>
                  </div>
                  
                  <div className="torch-package-price">
                    <span className="torch-currency">{pkg.currency}</span>
                    <span className="torch-amount">{pkg.price.toLocaleString()}</span>
                  </div>
                  
                  <div className="torch-package-credits">
                    {pkg.isCustom ? (
                      <div className="torch-custom-input-container">
                        <input
                          type="number"
                          placeholder="Enter credits"
                          value={customAmount}
                          onChange={handleCustomAmountChange}
                          className="torch-custom-input"
                          min="1"
                        />
                        <span className="torch-custom-credits-text">Credits</span>
                      </div>
                    ) : (
                      `${pkg.credits.toLocaleString()} Credits`
                    )}
                  </div>
                  
                  <div className="torch-package-disclaimer">
                    {pkg.disclaimer}
                  </div>
                  
                  <div className="torch-package-radio">
                    <input
                      type="radio"
                      name="package"
                      value={pkg.id}
                      checked={selectedPackage === pkg.id}
                      onChange={() => handlePackageSelect(pkg.id)}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Generate Payment Link Section */}
            {selectedPackage && (
              <div className="torch-payment-section">
                <div className="torch-selected-package">
                  <h3>Selected Package: {packages.find(pkg => pkg.id === selectedPackage)?.name}</h3>
                  <p>
                    Total: {packages.find(pkg => pkg.id === selectedPackage)?.currency}
                    {selectedPackage === 'custom' 
                      ? (parseInt(customAmount) || 0).toLocaleString()
                      : packages.find(pkg => pkg.id === selectedPackage)?.price.toLocaleString()
                    }
                  </p>
                </div>
                
                <button
                  className="torch-btn torch-btn-primary"
                  onClick={handleGeneratePaymentLink}
                  disabled={isGenerating}
                  style={{ marginTop: '20px' }}
                >
                  {isGenerating ? (
                    <>
                      <span className="torch-spinner"></span>
                      Generating...
                    </>
                  ) : (
                    'Generate Payment Link'
                  )}
                </button>

                {paymentLink && (
                  <div className="torch-payment-link-section">
                    <h4>Payment Link Generated</h4>
                    <div className="torch-link-container">
                      <input
                        type="text"
                        value={paymentLink}
                        readOnly
                        className="torch-link-input"
                      />
                      <button
                        className="torch-btn torch-btn-secondary torch-copy-btn"
                        onClick={handleCopyLink}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </SectionCard>

        {/* Toast Notification */}
        {showToast && (
          <div className="torch-toast">
            Payment link has been copied to your clipboard
          </div>
        )}
      </div>
    </div>
  );
};

export default TopUpCredits;
