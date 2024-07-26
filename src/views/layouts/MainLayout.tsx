{
    /* <body>
  <%- include('../components/layout/Header.ejs', { user, titleTerm }) %>
  <main><%- body %></main>
  <%- include('../components/layout/Footer.ejs') %>
</body> */
}

import Html from '@kitajs/html';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';

export default function RootLayout(
    props: Html.PropsWithChildren<{
        head?: string | Promise<string>;
        description?: string;
        title?: string;
    }>,
) {
    return (
        <>
            {'<!doctype html>'}
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>{props.title ?? 'Title'}</title>
                    <meta name="description" content={props.description || 'Description'} />
                    <link href="https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css" rel="stylesheet" />
                    <script src="https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.js" />
                    <link
                        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
                        rel="stylesheet"
                    />
                    <script defer src="https://unpkg.com/htmx.org@1.9.12" />
                    <script src="https://cdn.tailwindcss.com" />
                    <script defer src="//unpkg.com/alpinejs" />
                    {props.head ? Html.escapeHtml(props.head) : null}
                </head>
                <body>
                    <Header user={null} titleTerm="" />
                    <main>{props.children}</main>
                    <Footer />
                </body>
            </html>
        </>
    );
}
