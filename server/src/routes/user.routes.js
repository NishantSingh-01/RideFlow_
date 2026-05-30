import express, { Router } from 'express'
const router = Router() 

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min :3}).withMessage('First name must be 3 character long'),
    body('password').isLength({min :6}).withMessage('Passsword  must be 6 character long'),

])

export default router
