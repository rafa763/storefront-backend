import express from 'express';
import routes from './routes/index';

const app = express();
const PORT = 3000;
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Up and running!');
});

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});

export default app;