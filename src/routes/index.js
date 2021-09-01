const { Router } = require("express");

const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})
const fs = require('fs-extra')


const router = Router();

const Foto = require('../models/foto')

router.get('/', async(req, res) => {
    await Foto.find().then(fotos=>{
        const context = {
            photos: fotos.map(fo => {
                return {
                    title : fo.title,
                    imageURL: fo.imageURL
                }
            })
        }
        res.render('images', {photos: context.photos});
        console.log(context.photos);
    })
})

router.get('/images/add', async (req, res)=>{
    await Foto.find().then(fotos=>{
        const context = {
            photos: fotos.map(fo => {
                return {
                    title : fo.title,
                    description: fo.description,
                    imageURL: fo.imageURL,
                    _id: fo._id
                }
            })
        }
        res.render('image_form', {photos: context.photos});
        console.log(context.photos);
    })
})

router.post('/images/add', async (req, res)=>{
    const {title, description} = req.body;
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    console.log(result);
    const newFoto = new Foto ({
        title: title,
        description: description,
        imageURL: result.url,
        public_id: result.public_id
    });
    await newFoto.save();
    await fs.unlink(req.file.path)
    res.redirect('/')
})

router.get('/images/delete/:foto_id', async(req, res)=>{
    const {foto_id} = req.params;
    const foto = await Foto.findByIdAndDelete(foto_id);
    const result = await cloudinary.v2.uploader.destroy(foto.public_id);
    console.log(result);
    res.redirect('/images/add');
})

module.exports = router;