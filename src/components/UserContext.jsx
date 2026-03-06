import { createContext } from "react";
import PropTypes from 'prop-types';

// the UserContext
export const UserContext = createContext();

// the UserProvider component
export function UserProvider({ children, value }) {
  UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
    value: PropTypes.object.isRequired,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}