import jwt, { decode } from 'jsonwebtoken'

export const isLogin = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1] || req?.cookies?.token;


    if (!token) {
        return res.status(402).json({
            message: 'Unauthorized: No token provided',
        });
    }

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');

        if (decoded?.email !== 'admin@example.com') {
            return res.status(403).json({
                message: 'Forbidden: Insufficient permissions',
            });
        }

        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: 'Token has expired',
            });
        } else {
            return res.status(401).json({
                message: 'Invalid token',
            });
        }
    }
};
