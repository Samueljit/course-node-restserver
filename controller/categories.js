const { response } = require("express");
const { Category } = require('../models')


const getCategories = async (req, res = response) => {

    const { limit = 5, from = 0 } = req.query;
    const query = {status: true};

    const [total, categories ] = await Promise.all([ 
        Category.countDocuments(query),
        Category.find( query )
        .skip(Number(from))
        .limit(Number(limit))
    ]);

    res.json({
        total,
        categories
    });

}

// getCategory - populate { category }


const createCategory = async (req, res = response) => {

    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne( { name } );

    if ( categoryDB ) {
        return res.status(400).json({
            msg: `The category ${categoryDB.name} exist allready`
        });
    }

    // generate the data to save
    const data = {
        name,
        user: req.user._id
    }

    const category = new Category( data );

    // save DB
    await category.save(); 

    res.status(201).json(category)

}


// uptdateCategory 

// deleteCategory - status:false


module.exports = {
    createCategory,
    getCategories
}