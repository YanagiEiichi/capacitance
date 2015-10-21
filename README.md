# Capacitance

Collapse stream to a promise.

## Usage:

We are often write ugly code such as below:

```javascript
let buffers = [];
stream.on('data', buffer => buffers.push(buffer));
stream.on('end', () => {
  console.log(Buffer.concat(buffers));
});
```

Use the Capacitance, just write:

```javascript
stream.pipe(new Capacitance).then(data => {
  console.log(data);
});
```

## Demo: read synchronously form data (ES7)

```javascript
#!/usr/bin/env babel-node --stage 0

import Capacitance from 'capacitance';
import http from 'http';

http.createServer(async (req, res) => {
  switch(req.method) {
    case 'GET':
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(`
        <form method="post">
          <input name="test" value="xxx" />
          <input type="submit" value="Submit" />
        </form>
      `);
      return res.end();
    case 'POST':
      // Convert stream to a promise and await it as a synchronous data
      let data = await req.pipe(new Capacitance());
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write(data);
      return res.end();
  }
}).listen(8000);
```
