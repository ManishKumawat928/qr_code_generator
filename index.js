const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const qrcode = require("qrcode");
const port = process.env.PORT || 3000;

const staticPath = path.join(__dirname,"public")
const viewPath = path.join(__dirname, "views");
// console.log(viewPath);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", viewPath);
app.use(express.static(staticPath))
app.get("/", (req, res, next) => {
  res.render("index");
});

app.post("/scan", (req, res, next) => {
  const input_text = req.body.text;
  // console.log(input_text);
  qrcode.toDataURL(input_text, (err, src) => {
    res.render("scan", {
      qr_code: src,
    });
  });
});
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
