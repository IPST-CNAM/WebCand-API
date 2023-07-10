import { connection } from '../createDatabase';
import queryList from './queries';

const executeQuery = (query: string, tableName: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        connection.query(query, (error) => {
            if (error) {
                reject(new Error(`Erreur lors de la création de la table ${tableName} : ${error}`));
            } else {
                console.log(`Table ${tableName} créée ou existante`);
                resolve();
            }
        });
    });
};

export const createTables = async (): Promise<void> => {
    const queries = queryList.getQueries();
    for (const { query, tableName } of queries) {
        await executeQuery(query, tableName);
    }
};
