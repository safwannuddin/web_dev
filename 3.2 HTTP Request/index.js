import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("<h1>  Hello, world!</h1>");  // Send a response to the browser
});

app.get("/about", (req, res) => {
    res.send("<h1>  About Me</h1>");  // Send a response to the browser
});

app.get("/contact", (req, res) => {
    res.send("<h1> contact Me </h1>");  // Send a response to the browser
});


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
