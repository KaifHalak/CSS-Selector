'use strict';

import express from 'express';
import http from 'http';
import cors from 'cors';

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

let PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

// TODO: Config cors and error handling
// TODO: minify the css if its not already

const cssTest =
  '#content,#livePreview,.bootstrapMenu a,.bootstrapMenu span{cursor:default}#content,#liveFrame,.sidebar,body,html{height:100%}#errorMessage,.sidebar{color:#fff}#editableDiv,.highlightedCode,body{word-wrap:break-word}body{margin:0}.sidebar{text-align:center;padding:8px;position:fixed;z-index:10;top:0;border-right:1px solid #000;width:200px;background-color:#333;display:flex;flex-direction:column}';

app.post('/', async (req, res, next) => {
  let allURLsList = req.body;

  let finalPayload = [];

  if (!allURLsList) {
    return res.send('');
  }

  for (let url of allURLsList) {
    let response = await fetch(url);
    let cssText = await response.text();
    let cssMap = MapCSSSelectors(cssText);

    finalPayload.push(cssMap);
  }
  
  res.json(finalPayload);
  return;
});

function MapCSSSelectors(css) {
  const styleObject = {};
  const regex = /([^{]+)\{([^}]+)?\}/g;
  let match;

  while ((match = regex.exec(css)) !== null) {
    const selectors = match[1].trim().split(/\s*,\s*/);
    const styles = match[2] ? match[2].trim() : '';

    selectors.forEach((selector) => {
      if (!styleObject[selector]) {
        styleObject[selector] = [];
      }
      styleObject[selector].push(styles);
    });
  }

  return styleObject;
}
