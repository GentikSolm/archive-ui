import * as React from "react";
const PageContext = React.createContext({
    isDark: true,
    toggleTheme: () => {},
    loginId: undefined,
    selectedID: undefined
});
export default PageContext;
