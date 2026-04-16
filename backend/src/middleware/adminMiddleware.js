import ApiError from "../utils/apiError.js"

const verifyAdmin = (req, res, next) => {
    if(req.user.role !== "admin") {
        throw new ApiError(403, "Access denied. Admins only.")
    }
    next()
}

export default verifyAdmin