const express = require('express');
const path = require('path');
const router = express.Router();
const {addPost, getLatestPosts ,getFilteredPosts} = require('../controllers/app');
const pathfile = path.join(__dirname,'../public');



router.get('/latest-posts', getLatestPosts);
router.get('/posts-data', getFilteredPosts);
router.get('/', (req, res) => {
    res.sendFile(pathfile + '/index.html');
});

router.get('/about',(req,res)=>{
    res.sendFile(pathfile + '/contact.html');
})

router.get('/posts', (req, res) => {
    res.sendFile(pathfile + '/posts.html');
});

router.get('/newpost', (req, res) => {
    res.sendFile(pathfile + '/addpost.html');
});

router.post('/add',addPost);


module.exports = router;