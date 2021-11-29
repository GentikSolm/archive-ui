import * as React from "react";
const PageContext = React.createContext({
    isDark: true,
    setGames: () => {},
    setLoginInfo: () => {},
    toggleTheme: () => {},
    changeId: () => {},
    loginId: undefined,
    selectedID: undefined,
    token: undefined,
    expiration: undefined,
    games: undefined,
});
export default PageContext;
