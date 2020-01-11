const express = require('express');
const router = express.Router();
const postRouter = require('./post');

router.get('/', function(req, res, next) {
  res.status(200).send('hello');
});

router.use('/posts', postRouter);
router.use('/err', (req, res, next) => {
  next('error occurs!');
});


const printChar=(alpha,time)=>{
  return new Promise(function(resolve,reject){
    setTimeout(()=>{
    console.log(alpha);
    resolve();
  },time)
  });
}

async function printAll(){
  await printChar('a',5000);
  await printChar('b',3000);
  await printChar('c',1000);
  throw new Error('error')
}

router.get('/async', async function(req, res, next) {
  try {
    await printAll();
  } catch (err) {
    next(err);
  }
});
router.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({msg: 'error occur!'});
});


module.exports = router;
