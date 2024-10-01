import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // You might want to fetch the user data here
  useEffect(() => {
    // Example: fetch user data from an API or local storage
    // const userData = fetchUserData();
    // setUser(userData);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};