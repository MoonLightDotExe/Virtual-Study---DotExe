const dotenv = require('dotenv').config()
const user_repo = require('../repository/user.repository')

module.exports = {
    register: async (req, res) => {
        try {
            // console.log(req.body)
            const data = await user_repo.register(req.body)
            res.json({
                success: true,
                data,
                msg: 'Registered Successfully',
            })
        } catch (error) {
            console.log(error)
            res.json({
                success: false,
                Error: error,
                msg: 'Registration failed!',
            })
        }
    },
    login: async (req, res) => {
        try {
            const data = await user_repo.login(req.body)
            res.json({
                success: true,
                data,
                msg: 'Login Successfully',
            })
        } catch (error) {
            res.json({
                success: false,
                Error: error,
                msg: 'Login failed!',
            })
        }
    }
}