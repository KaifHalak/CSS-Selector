'use strict';

import express from 'express';
import http from 'http';
import cors from 'cors';
import sampleCSS from './temp.mjs';

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

app.post('/', async (req, res, next) => {
  res.json(sampleCSS);
  return;

  console.log('Hello');

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
