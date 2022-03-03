import {Request, Response} from 'express';
import bcryptjs from 'bcryptjs';
import config from 'config';
import jwt from 'jsonwebtoken';
import db from '../database/db';

export default class {

    async sign_in(req: Request, res: Response){
        try {
            let {email, password} = req.body;
            
            db.query(`SELECT * FROM users WHERE email = ?`, email, (err, result) => {                
                let user: any = result;

                if(user.length > 0 && bcryptjs.compareSync(password, user[0].password)) {
                    let token = jwt.sign({user}, config.get<string>('SECRET'), {expiresIn: '24h'});
                    res.status(200).json({token: token});
                } else res.status(404).json({msg: 'Invalid email or password'});
            });
        } catch (error: any) {
            res.status(500).json({msg: 'Erro: '+ error.message});
        }
    }

    async createUser(req: Request, res: Response){
        try {
            let {name, lastname, email, password, role} = req.body; 

            let hash = await bcryptjs.hashSync(password, 15);
            db.query(`INSERT INTO users (name, lastname, email, password, role) VALUES (?, ?, ?, ?, ?)`, [
                name, lastname, email, hash, (role === undefined || role === '') ? 0 : role
            ], (err, result) => {
                if(err) res.status(403).json({msg: 'Email already in use'});
                else res.status(201).json({msg: 'User Registered'});
            });
        } catch (error: any) {
            res.status(500).json({msg: 'Error: ' + error.message});
        }
    }

    async listAllUsers(req: Request, res: Response) {
        try {
            db.query('SELECT id, name, lastname, email, role FROM users', (err, result) => {
                if(err) res.status(404).json({msg: err});

                res.status(200).json({users: result});
            });
        } catch (error: any) {
            res.status(500).json({msg: 'Error: ' + error.message});
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            let {id, name, lastname, email} = req.body;

            db.query(`UPDATE users SET name = ?, lastname = ?, email = ? WHERE id = ?`, [
                name, lastname, email, id
            ], (err, result) => {
                if(err) res.status(404).json({msg: err.message});

                res.status(200).json({msg: 'User Updated'});
            });
        } catch (error: any) {
            res.status(500).json({msg: 'Error: ' + error.message});
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            db.query('DELETE FROM users WHERE id = ?', req.params.id, (err, result) => {
                if(err) res.status(500).json({msg: err.message});

                res.status(200).json({msg: 'User deleted'});
            });
        } catch (error: any) {
            res.status(500).json({Msg: 'Erro: ' + error.message});
        }
    }

}