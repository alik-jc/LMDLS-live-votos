import React, { useContext } from 'react';

const Context = React.createContext<any>(undefined as any);

export function PageContextProvider({ pageContext, children }: { pageContext: any; children: React.ReactNode }) {
    return <Context.Provider value={pageContext}>{children}</Context.Provider>;
}

export function usePageContext() {
    const pageContext = useContext(Context);
    return pageContext;
}
