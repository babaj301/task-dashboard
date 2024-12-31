import React, { useState } from 'react';
import SideBar from '../containers/SideBar';
import Tasks from '../containers/Tasks';
const TodoApp = () => {
  const [selectedTab, setSelectedTab] = useState('work');

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleExit = () => {
    console.log('exit');
  };
  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      <SideBar
        onTabChange={handleTabChange}
        handleExit={handleExit}
        selectedTab={selectedTab}
      />
      {/* Tasks Display */}
      <Tasks tab={selectedTab} />
    </div>
  );
};

export default TodoApp;
