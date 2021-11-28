import * as React from "react";
const PageContext = React.createContext({
    isDark: true,
    toggleTheme: () => {},
    changeId: () => {},
    loginId: undefined,
    selectedID: undefined
});
export default PageContext;
