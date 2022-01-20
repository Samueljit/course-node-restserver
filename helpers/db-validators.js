const Role = require('../models/role');
const User = require('../models/user');

const  validateRole = async (role = '') => {

    const existRole = await Role.findOne( { role } );
    if (!existRole) {
            throw new Error(`The role: ${role} is not registered in the DB`);
    }
}

const validateEmail = async(email = '') => {

    const emailExists = await User.findOne({ email });
    if (emailExists) {
        throw new Error(`The email: ${email} already exists in the DB`);
    }
}

const validateUserExistsByID = async( id ) => {

    const userExist = await User.findById( id );
    if (!userExist) {
        throw new Error(`The id: ${id} not exists`);
        }
    } 
 

module.exports = {
    validateRole,
    validateEmail,
    validateUserExistsByID
}