import { createContext, useState, useEffect } from 'react';

// Create a context
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};
