import { createContext } from "react";

const AuthContext = createContext({
  isClicked: false,
  setIsClicked: () => {},
});
export const SearchBtnClickedAuthContext = createContext({
  isBtnClicked: false,
  setIsBtnClicked: () => {},
});
export default AuthContext;
