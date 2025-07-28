import { useState } from 'react';
import { UserContext } from './UserContext';

export function UserProvider({ children }) {
  const [user, setUser] = useState();

  const login = (userName) => {
    console.log('[UserProvider] login:', userName);
    setUser(userName);
  };
  const logout = () => {
    console.log('[UserProvider] logout');
    setUser();
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}