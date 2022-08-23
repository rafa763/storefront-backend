import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('starter!');
});

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
