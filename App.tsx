
import React, { useState, createContext, useContext } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Paths from './components/Paths';
import Internship from './components/Internship';
import Labs from './components/Labs';
import FirebaseArchitect from './components/FirebaseArchitect';
import AIMentor from './components/AIMentor';

// Context for global navigation across components
interface NavContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const NavContext = createContext<NavContextType>({
  activeTab: 'home',
  setActiveTab: () => {},
});

export const useNav = () => useContext(NavContext);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Dashboard />;
      case 'paths':
        return <Paths />;
      case 'internship':
        return <Internship />;
      case 'labs':
        return <Labs />;
      case 'firebase':
        return <FirebaseArchitect />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <NavContext.Provider value={{ activeTab, setActiveTab }}>
      <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
        <div className="animate-in fade-in duration-500">
          {renderContent()}
        </div>
        <AIMentor />
      </Layout>
    </NavContext.Provider>
  );
};

export default App;
