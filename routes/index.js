const router=require('express').Router();

const userRouter=require('./userRouter');
const adminRouter=require('./adminRouter');

const customerRouter=require('./customer');


router.use('/user',userRouter);
router.use('/admin',adminRouter);

router.use('/customer',customerRouter);


module.exports=router;