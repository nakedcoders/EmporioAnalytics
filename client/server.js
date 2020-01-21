var express = require('express');
var next = require("next");

let dev = process.env.NODE_ENV !== "production";
dev = process.env.NODE_ENV !== "staging";

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();
   
 
    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log("Server ready listening at port "+ `${3000}`);
    });

}).catch(ex => {
  console.error(ex.stack);
  process.exit(1);
});

