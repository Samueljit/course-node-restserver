const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');



const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                msg: 'User / Password are not correct - email'
            })
        }

        if (!user.status) {
            return res.status(400).json({
                msg: 'User / Password are not correct - status: false'
            })
        }

        const validatePassword = bcryptjs.compareSync( password, user.password );
        if (!validatePassword) {
            return res.status(400).json({
                msg: 'User / Password are not correct - password'
            })
        }

        const token = await generateJWT( user.id );

        
        res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Talk to the administrator'
        })   
    }
}

const googleSingIn = async (req, res = response) => {

    const {id_token} = req.body;

    try {
        
        const {name, img, email} = await googleVerify( id_token );
        
        let user = await User.findOne( { email } );


        if (!user) {
            // i have to create it
            const data = {
                name,
                email,
                password: ':P',
                img,
                google: true,
                role: "USER_ROLE"
            };

            user = new User( data );
            await user.save();
        }
        
        // if user in DB
        if (!user.status) {
            return res.status(401).json({
                msg: 'Talk with the admin, user blocked'
            });
        }

        // generate JWT
        const token = await generateJWT( user.id );


        res.json({
            user,
            token
        })

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Token could not be verified',
            error
        })
    }  
}

module.exports = {
    login,
    googleSingIn
}