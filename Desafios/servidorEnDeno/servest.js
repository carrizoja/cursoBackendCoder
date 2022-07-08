//@deno-types="https://deno.land/x/servest@1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
//@deno-types="https://deno.land/x/servest@1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { createApp } from 'https://deno.land/x/servest@1.3.1/mod.ts';

const app = createApp();

app.handle("/", async(req) => {
    await req.respond({
        status: 200,
        Headers: new Headers({
            "Content-Type": "text/plain",
        }),
        body: ReactDOMServer.renderToString( <
            html >
            <
            head >
            <
            meta charSet = "utf-8" / >
            <
            title > Hello World < /title> <
            /head> <
            body >
            <
            h1 style = {
                { color: "blue" } } > Hello Servest with React < /h1> <
            h2 style = {
                { color: "brown" } } > Hello Servest with React < /h2> <
            h3 style = {
                { color: "purple" } } > { " " }
            FyH: { new Date().toLocaleString() } <
            /h3> <
            /body> <
            /html>
        ),
    });
});

app.listen({ port: 8888 });