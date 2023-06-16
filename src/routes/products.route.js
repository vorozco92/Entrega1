import { Router } from "express";
import ProductManager from '../_data/ProductManager.js'

const router =Router();

const productManager =  new ProductManager('./src/_data/products.json');

router.get('/',(req,res)=>{
    let limit = req.query.limit ?? 0;
    productManager.getProducts().
        then(resultado => { 
            let products = JSON.parse(resultado);
            if (limit)
                products = products.filter( (a ,index ) =>{ if (index < limit) return a})
            res.send({products});
            })
        ;
})

router.get('/:id',(req,res)=>{
    let pid = req.params.id;

    productManager.getProducts().
        then(resultado => { 
            let products = JSON.parse(resultado);
            let product = products.find(a => a.id == pid)
            res.send({product});
         })
        .catch(error => { 
            res.send({status:'error', msg: error});
        });
})

router.post('/', (req, res)=>{
    let product = req.body;
    if (! product.title || product.title === '' ||
        ! product.description || product.description === '' ||
        ! product.code || product.code === '' ||
        ! product.price || product.price === '' ||
        ! product.stock || product.stock === '' ||
        ! product.category || product.category === '')
            res.status(400).send({status:"error", error_description: "Informacion incompleta"});

        if (! product.status || product.status === '')
            product.status = 'true';    
        if(productManager.addProduct(product))
            res.send({status:"success", message :"Producto agregado correctamente"});
        else
            res.status(400).send({status:"error", error_description: "No fue posible agregar el producto"});
})

router.put('/:pid', (req, res)=>{
    let product = req.body;
    let pid = req.params.pid;

    if (! product.title || product.title === '' ||
        ! product.description || product.description === '' ||
        ! product.code || product.code === '' ||
        ! product.price || product.price === '' ||
        ! product.stock || product.stock === '' ||
        ! product.category || product.category === ''){
            console.log(product);
            res.status(400).send({status:"error", error_description: "Informacion incompleta"});
    }
    else{
        product.id = pid.toString();
        console.log('pid:'+typeof pid);
        if (! product.status || product.status === '')
            product.status = 'true';    
        if (productManager.editProduct(product))
            res.send({status:"success", message :"Producto editado correctamente"});
        else
            res.status(400).send({status:"error", error_description: "No fue posible editar el producto"});
    }
})

router.delete('/:pid', (req, res)=>{
    let pid = req.params.pid;
    if(productManager.deleteProductById(pid))
        res.send({status:"success", message :"Producto eliminado correctamente"});
    else
        res.send({status:"error", message :"No fue posible eliminar el producto"});
});
export default router;