import express, {Request, Response, NextFunction} from 'express';
import mariadb from 'mariadb';

const router = express.Router();

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: 5, // Adjust as per your requirements
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
