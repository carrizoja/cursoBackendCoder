// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { createApp } from "https://deno.land/x/servest@v1.3.1/mod.ts";

const app = createApp();
//let myColors: any = [];
// denon run --allow-net index.tsx Run me
// const handleClick = () => {
//   const color = document.getElementById("colorinpt");
//   myColors.push(color);
// };
app.handle("/", (req: any) => {
  req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8",
    }),
    body: ReactDOMServer.renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>servest</title>
        </head>
        <body>
          <form>
            <h1>Welcome!</h1>
            <h3>Please, input a color (in English ): </h3>
            <input type="text" id="colorinpt" />
            <button type="button">Send</button>
          </form>
          <section>
            <p>Your array of colors:</p>
            {/*             {myColors.map((item: any) => {
              <li>{item}</li>;
            })} */}
          </section>
        </body>
      </html>
    ),
  });
});

app.listen({ port: 6000 });
