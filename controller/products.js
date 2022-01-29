const { response } = require("express");
const { Product } = require('../models')


const getProducts = async (req, res = response) => {

    const { limit = 5, from = 0 } = req.query;
    const query = {status: true};

    const [total, products ] = await Promise.all([ 
        Product.countDocuments(query),
        Product.find( query )
        .populate('user', 'name')
        .populate('category', 'name')
        .skip(Number(from))
        .limit(Number(limit))
    ]);

    res.json({
        total,
        products
    });

}

const getProduct = async (req, res = response) => {


    const { id } = req.params;
    const product = await Product.findById( id )
                                 .populate('user', 'name')
                                 .populate('category', 'name');

    res.json( product );

}


const createProduct = async (req, res = response) => {

    const {status, user, name, ...body} = req.body;

    const productDB = await Product.findOne( { name } );

    if ( productDB ) {
        return res.status(400).json({
            msg: `The product ${productDB.name} exist allready`
        });
    }

    // generate the data to save
    const data = {
        ...body,
        name,
        user: req.user._id
    }

    const product = new Product( data );

    // save DB
    await product.save(); 

    res.status(201).json(product)

}


const uptdateProduct = async(req, res = response) => {


    const { id } = req.params;
    const { status, user, ...data } = req.body;

    if (data.name) {
        data.name = data.name.toUpperCase();
    }
    
    data.user = req.user._id;

    const product = await Product.findByIdAndUpdate(id, data, {new: true});

    res.json( product );

}

const deleteProduct = async (req, res = response) => {

    const { id } = req.params;
    const deleteProd = await Product.findByIdAndUpdate(id , { status: false}, { new: true });
    
    res.json( deleteProd );

}


module.exports = {
    createProduct,
    getProducts,
    getProduct,
    uptdateProduct,
    deleteProduct
}