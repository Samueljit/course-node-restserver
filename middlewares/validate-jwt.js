const { response } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');


const validateJWT = async (req = request , res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'There is no token in the app'
        })
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        
        req.uid = uid;

        const user = await User.findById( uid );

        if ( !user ){
            return res.status(401).json({
                msg: 'Invalid token - user does not exist in DB'
            })
        }        

        // check if the uid is in true state
        if (!user.status) {
            return res.status(401).json({
                msg: 'Invalid token - status user false'
            })
        }



        req.user = user; 
        next();
    
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'invalid token'
        })
    }
    

}


module.exports = {
    validateJWT
}