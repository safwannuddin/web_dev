import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/index.js'; // Correct import for routes

const app = express();
const port = 3000;

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use routes from the routes/index.js file
app.use('/', routes);

// Static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
router.post('/submit', (req, res) => {
    const { title, content } = req.body;
    posts.push({ title, content });  // Save the new post to the posts array
    res.redirect('/');
  });
  router.post('/delete', (req, res) => {
    const postId = req.body.postId;
    posts.splice(postId, 1);  // Remove the post by index
    res.redirect('/');
  });
  