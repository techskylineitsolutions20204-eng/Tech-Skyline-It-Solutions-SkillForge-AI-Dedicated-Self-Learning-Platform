
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Paths from './components/Paths';
import Labs from './components/Labs';
import FirebaseArchitect from './components/FirebaseArchitect';
import AIMentor from './components/AIMentor';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Dashboard />;
      case 'paths':
        return <Paths />;
      case 'labs':
        return <Labs />;
      case 'firebase':
        return <FirebaseArchitect />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="animate-in fade-in duration-500">
        {renderContent()}
      </div>
      <AIMentor />
    </Layout>
  );
};

export default App;
