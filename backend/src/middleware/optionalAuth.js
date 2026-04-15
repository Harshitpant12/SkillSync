import jwt from "jsonwebtoken"

import User from "../models/User.js"

const optionalAuth = async(req, res, next) => {
    try {
        const reqHeader = req.headers['authorization']

        if(!reqHeader){
            req.user = null
            return next() // no token, it must be guest user, just continue
        }

        const token = reqHeader.replace("Bearer ", "")
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        const user = await User.findById(decoded._id).select("-password")

        req.user = user || null
    } catch (error) {
        req.user = null // token invalid or expired
    }
    next()
}

export default optionalAuth