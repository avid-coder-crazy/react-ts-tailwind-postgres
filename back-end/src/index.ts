import express from 'express';
import cors from 'cors';
import usersRouter from './routes/users';
import productsRouter from './routes/products';
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
