import express, {Request, Response, NextFunction} from 'express';
import mariadb from 'mariadb';

const router = express.Router();

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'user',
    password: 'user',
    database: 'TestWebcand'
});

/* GET users listing using mariadb */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const conn = await pool.getConnection();
        try {
            const rows = await conn.query("SELECT * FROM users;");
            res.send(rows);
        } catch (err) {
            console.log(err);
        } finally {
            conn.end();
        }
    } catch (err) {
        console.log(err);
    }
});

export default router;
