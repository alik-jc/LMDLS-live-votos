import React from 'react';
import { PageContextProvider } from './usePageContext';
import '../index.css';

export function PageShell({ pageContext, children }: { pageContext: any; children: React.ReactNode }) {
    return (
        <React.StrictMode>
            <PageContextProvider pageContext={pageContext}>
                {children}
            </PageContextProvider>
        </React.StrictMode>
    );
}
