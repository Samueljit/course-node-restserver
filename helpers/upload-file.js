const path = require('path');
const { v4: uuidv4 } = require('uuid');


const uploadFile = (files, validateExtensions = ['png','jpg', 'jpeg', 'gif'], folder = '') => {

    return new Promise((resolve, reject) => {
    
        const {file} = files;
        const cutName = file.name.split('.');
        const extension = cutName[cutName.length - 1];

        //validate the extension
        if (!validateExtensions.includes(extension)) {
            return reject(`the extension -${extension}- is not allowed -> ${validateExtensions}`);
        }

        const finalNAme = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/',folder , finalNAme);

        file.mv(uploadPath, (err) => {
            if (err) {
                reject('este es el error', err)
            }

            resolve( uploadPath );
        })
    });
}


module.exports = {
    uploadFile
}