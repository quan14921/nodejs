import User from '../models/user';
import jwt from 'jsonwebtoken';

export const signup = async (request,response)=>{
    const {email,name,password} = request.body
    try {
        const exitsUser = await User.findOne({email}).exec()
        if(exitsUser){
            return response.status(400).json({
                message:"User da ton tai"
            })
        }
        const user = await User({email,name,password}).save()
        response.json({
            user:{
                _id:user._id,
                email:user.email,
                name:user.name
            }
        })
    } catch (error) {
        response.status(400).json({
            message: "Đăng ký thất bại"
        })
    }
}


export const signin = async (req, res) => {
    const { email, password} = req.body;
    try {
        const user = await User.findOne({email}).exec();
        if(!user){
            res.status(400).json({
                message: "Email không tồn tại"
            })
        }
        if(!user.authenticate(password)){
            res.status(400).json({
                message: "Mật khẩu không đúng"
            })
        }
        const token = jwt.sign({_id: user._id}, "123456", { expiresIn: '1h'})
        res.json({
            token,
            user: {
                _id: user._id,
                email: user.email,
                name: user.name
            }
        })
    } catch (error) {
        res.status(400).json({
            message: "Đăng nhập thất bại"
        })
    }
}