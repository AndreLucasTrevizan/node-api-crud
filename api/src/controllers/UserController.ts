import {Request, Response} from 'express';
import bcryptjs from 'bcryptjs';
import db from '../database/db';

export default class {

    async createUser(req: Request, res: Response){
        try {
            let {name, lastname, email, password, role} = req.body; 

            if(email != undefined || password != '') {
                let hash = bcryptjs.hashSync(password, 15);
                db.query(`INSERT INTO users (name, lastname, email, password, role) VALUES (?, ?, ?, ?, ?)`, [
                    name, lastname, email, hash, role
                ], (err, result) => {
                    if(err) res.status(403).json({msg: err.message});
                    
                    res.status(201).json({msg: 'User Registered'});
                });
            }
        } catch (error: any) {
            res.status(500).json({msg: 'Error: ' + error.message});
        }
    }

}