import express from 'express';

const router = express.Router();

// Sample posts data
const posts = [
  { title: 'First Post', content: 'This is the content of the first post.' },
  { title: 'Second Post', content: 'This is the content of the second post.' },
  { title: 'Third Post', content: 'This is the content of the third post.' }
];

// Define route for home page
router.get('/', (req, res) => {
  res.render('index', { posts: posts });  // Pass posts to the view
});

export default router;
