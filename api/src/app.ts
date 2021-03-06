import express, {Request, Response} from 'express';
import config from 'config';
import cors from 'cors';
import db from './database/db';

const app = express();

app.use(cors());

app.use(express.json());

const port = config.get<string>('PORT');

import router from './routes/router';

app.use('/api', router);

app.listen(port, () => {
    db.connect((err: any) => {
        if(err) {   
            console.log(`An error ocurred while trying to connect in database: ${err.message}`);
            return;
        }
        
        console.log(`Listening at port ${port}`);
    });
});