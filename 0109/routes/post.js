const express = require('express');
const fs = require('fs-extra');
const router = express.Router();

const postsPath = './posts.json'
router.post('/', (req, res) => {
  let posts = [];
  if (fs.pathExistsSync(postsPath)) {
    posts = fs.readJSONSync(postsPath);
  }
  
  const id = new Date().getTime().toString();

  fs.writeJSONSync(postsPath, [...posts, {id: id, title: req.body.title, content: req.body.content}]);
  
  res.status(200).json({success: true});
});

router.get('/', (req, res) => {
  let posts = [];
  if (fs.pathExistsSync(postsPath)) {
    posts = fs.readJSONSync(postsPath);
  } 
  res.status(200).json({success: true,posts:[...post]});
})  

router.delete('/:id', (req, res) => {
  if(req.cookies.auth==='admin'){
    let posts=[];
    if(fs.pathExistsSync(postsPath)){
      posts=fs.readJSONSync(postsPath);
      let i=0;
      let len=posts.length;
      let index=len;
      for(i=0;i<len;i++)
      {
        if(posts[i].id===req.cookies.id)
        {
          index=i;
          break;
        }
      }
      if(index!==len)
      {
        posts.splice(index,1);
        fs.writeJSONSync(postsPath,[...posts]);
      }
      res.status(200).json({success: true});
     }   
  }

  else res.status(403).json({success: false});

})

module.exports = router;
