const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    try{

        // je récupère mon token
        const token = req.headers.authorization.split(' ')[1];

        // je le décode
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');

        // je récupère l'userId
        const userId = decodedToken.userId;

        req.auth = {
            userId: userId
        };

        next();

    }catch(error){
        res.status(401).json({ error });
    }

}