import express from 'express'
import productRouter from './routes/products.route.js'
import cartRouter from './routes/carts.route.js'


const app = new express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/products',productRouter);
app.use('/api/carts',cartRouter);

const servidor = app.listen(8080, ()=>{console.log('Server up');})