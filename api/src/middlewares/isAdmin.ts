import {Request, Response, NextFunction} from 'express';
import config from 'config';
import jwt from 'jsonwebtoken';

export default (req: Request, res: Response, next: NextFunction) => {
    let authToken = req.headers['authorization'];
    if(authToken) {
        let BearerToken = authToken.split(' ');
        let token = BearerToken[1];
        jwt.verify(token, config.get<string>('SECRET'), (err: any, decoded: any) => {
            if(err) res.status(406).json({msg: 'Inválid Token!'});

            if(decoded.role === 1) {
                next();
            } else res.status(406).json({msg: `You don't have permission to access`});
        });
    } else res.status(406).json({msg: 'Token not provided!'});
};