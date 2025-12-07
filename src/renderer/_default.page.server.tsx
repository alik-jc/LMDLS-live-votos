import ReactDOMServer from 'react-dom/server';
import { PageShell } from './PageShell';
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr/server';
import type { PageContextBuiltIn } from 'vite-plugin-ssr/types';

export const passToClient = ['pageProps', 'urlPathname'];

type PageContext = PageContextBuiltIn & {
  Page: any;
  pageProps: any;
  exports: {
    documentProps?: {
      title?: string;
      description?: string;
    };
  };
};

export async function render(pageContext: PageContext) {
  const { Page, pageProps } = pageContext;

  // This render() hook only supports SSR, see https://vite-plugin-ssr.com/render-modes for how to modify render() to support SPA
  if (!Page) throw new Error('My render() hook expects pageContext.Page to be defined');

  const pageHtml = ReactDOMServer.renderToString(
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>
  );

  // See https://vite-plugin-ssr.com/head
  const { documentProps } = pageContext.exports;
  const title = (documentProps && documentProps.title) || 'LMDLS: Votación en Vivo | Westcol';
  const desc = (documentProps && documentProps.description) || '🔴 Votación OFICIAL en VIVO de La Mansión de los Streamers de Westcol. Consulta el ranking actualizado cada minuto, vota por tu favorito y descubre quién está en peligro de eliminación. Resultados en tiempo real 24/7.';

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/lamansion-logo.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
        
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website" />
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="${desc}" />
        <meta property="og:image" content="https://i0.wp.com/i.imgur.com/KtdMrMY.png" />
        <meta property="og:url" content="https://lamansionlivevotos.vercel.app/" />
        <meta property="og:site_name" content="La Mansión Live Votos" />
        <meta property="og:locale" content="es_CO" />
        <meta property="og:updated_time" content="2025-12-07T00:00:00Z" />

        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="${title}" />
        <meta property="twitter:description" content="${desc}" />
        <meta property="twitter:image" content="https://i0.wp.com/i.imgur.com/KtdMrMY.png" />
        
        <link rel="canonical" href="https://lamansionlivevotos.vercel.app/" />
        
        <script type="application/ld+json">
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "La Mansión de los Streamers - Votación en Vivo",
            "url": "https://lamansionlivevotos.vercel.app/",
            "description": "Plataforma oficial de votación en tiempo real para La Mansión de los Streamers",
            "applicationCategory": "EntertainmentApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "author": {
              "@type": "Person",
              "name": "Westcol"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "1250"
            }
          }
        </script>
      </head>
      <body>
        <div id="root">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
    }
  };
}
