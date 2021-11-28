import * as React from "react";
const PageContext = React.createContext({
    isDark: true,
    setLoginInfo: () => {},
    toggleTheme: () => {},
    changeId: () => {},
    loginId: undefined,
    selectedID: undefined,
    token: undefined,
    expiration: undefined,
});
export default PageContext;
