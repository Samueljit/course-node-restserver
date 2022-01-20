const  { response, request } =  require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');





const usersGet = async (req = request, res = response) => {
    
    const { limit = 5, from = 0 } = req.query;
    const query = {status: true};

    const [total, users ] = await Promise.all([ 
        User.countDocuments(query),
        User.find( query )
        .skip(Number(from))
        .limit(Number(limit))
    ]);

    res.json({
        total,
        users
    });
}

const userPut = async (req, res) => {
    
    const { id } = req.params;
    const { password, google, email, ...rest } = req.body;
    
    if ( password ) {
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync( password, salt);
    }

    const user = await User.findByIdAndUpdate( id, rest );
    
    res.json(user);
}

const userPost = async (req, res) => {
    
    const { name, email, password, role } = req.body;
    const user = new User( {name, email, password, role} );

    // encrypt the password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt);

    // save DB
    await user.save();

    res.json(user);
}

const userDelete = async (req, res) => {

    const { id } = req.params;

    //const user = await User.findByIdAndDelete( id );

    const user = await User.findByIdAndUpdate(id, { status: false })
    res.json(user);
}

const userPatch = (req, res) => {
    res.json({
        msg: 'patch API - Controller'
    });    
}


module.exports = {
    usersGet,
    userPut,
    userPost,
    userDelete,
    userPatch
}