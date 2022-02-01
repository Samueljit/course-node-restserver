const { response } = require("express");
const { uploadFile } = require("../helpers");


const fileUpload = async (req, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file){
        res.status(400).json({msg: 'No files were uploaded.'});
        return;
    }

    // images
    const name =  await uploadFile(req.files);

    res.json({ name })
}


module.exports = {
    fileUpload
}