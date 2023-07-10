export class Query {
    private queries: { tableName: string; query: () => string }[];
  
    constructor() {
      this.queries = [];
    }
  
    public addQuery(tableName: string, query: () => string): void {
      this.queries.push({ tableName, query });
    }
  
    public getQueries(): { tableName: string; query: string }[] {
      return this.queries.map(({ tableName, query }) => ({
        tableName,
        query: query(),
      }));
    }
  }
  
