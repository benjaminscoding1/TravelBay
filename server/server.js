import dotenv from 'dotenv';
dotenv.config();
import db from './db.js';
import express from 'express';
import path from 'path';

//Our Routes
import blogPostRoutes from './routes/blogPostRoutes.js';
import userRoutes from './routes/userRoutes.js';

db();
const app = express();

app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
    limit: '50mb',
  })
);

app.use('/api/blog-posts', blogPostRoutes);
app.use('/api/users', userRoutes);

app.get('/api/config/emailjs', (req, res) =>
  res.send({
    template_id: process.env.TEMPLATE_ID,
    service_id: process.env.SERVICE_ID,
    public_key: process.env.PUBLIC_KEY,
  })
);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server runs on port ${port}.`);
});
