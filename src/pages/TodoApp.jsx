import React, { useState } from 'react';
import SideBar from '../containers/SideBar';
import Tasks from '../containers/Tasks';
const TodoApp = () => {
  const [selectedTab, setSelectedTab] = useState('work');

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };
  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      <SideBar onTabChange={handleTabChange} selectedTab={selectedTab} />
      {/* Tasks Display */}
      <Tasks tab={selectedTab} />
    </div>
  );
};

export default TodoApp;
