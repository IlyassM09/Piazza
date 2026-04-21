const User = require('../models/User')

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)

        if (!user) {
            return res.status(404).send({ message: 'User not found' })
        }

        if (user.role !== 'admin') {
            return res.status(403).send({ message: 'Access denied. Admin only.' })
        }

        next()
    } catch (error) {
        res.status(500).send({ message: 'Server error' })
    }
}

module.exports = isAdmin
