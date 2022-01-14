const  { response, request } =  require('express');


const usersGet = (req = request, res = response) => {
    
    const { q, 
            nombre = 'no name' , 
            apikey, 
            page = 1, 
            limit } = req.query;
    
    res.json({
        msg: 'get API - Controller',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const userPut = (req, res) => {
    
    const {id} = req.params;
    
    res.status(500).json({
        msg: 'put API - Controller',
        id
    });
}

const userPost = (req, res) => {
    
    const { nombre, edad } = req.body;

    res.status(201).json({
        msg: 'post API - Controller',
        nombre,
        edad
    });
}

const userDelete = (req, res) => {
    res.json({
        msg: 'delete API - Controller'
    });
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