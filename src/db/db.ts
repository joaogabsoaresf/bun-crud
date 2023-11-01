import { Database } from 'bun:sqlite'

export interface Game {
    id?: number;
    name: string;
    gender: string;
}

export class GameDatabase {
    private db: Database;

    constructor() {
        this.db = new Database('games.db');
        this.init()
            .then(() => console.log('✅ Database initialized!'))
            .catch(console.error);
    }

    async getGames() {
        return this.db.query('SELECT * FROM games').all();
    }

    async addGame(game: Game) {
        // q: Get id type safely 
        return this.db.query(`INSERT INTO games (name, gender) VALUES (?, ?) RETURNING id`).get(game.name, game.gender) as Game;
    }

    async updateGame(id: number, game: Game) {
        return this.db.run(`UPDATE games SET name = '${game.name}', gender = '${game.gender}' WHERE id = ${id}`)
    }

    async deleteGame(id: number) {
        return this.db.run(`DELETE FROM games WHERE id = ${id}`)
    }

    async init() {
        return this.db.run('CREATE TABLE IF NOT EXISTS games (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, gender TEXT)');
    }
}