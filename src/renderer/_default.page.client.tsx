import { hydrateRoot } from 'react-dom/client';
import { PageShell } from './PageShell';
import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client/router';

export const clientRouting = true;
export const hydrationCanBeAborted = true;

type PageContext = PageContextBuiltInClient & {
    Page: any;
    pageProps: any;
};

export async function render(pageContext: PageContext) {
    const { Page, pageProps } = pageContext;
    if (!Page) throw new Error('Client-side render() hook expects pageContext.Page to be defined');

    const root = document.getElementById('root');
    if (!root) throw new Error('DOM element #root not found');

    hydrateRoot(
        root,
        <PageShell pageContext={pageContext}>
            <Page {...pageProps} />
        </PageShell>
    );
}
