import { Injectable } from '@angular/core';
import { Database } from 'sqlite3';
import { BotAction } from './BotAction';
import { BotQuery } from './BotQuery';
import { CriterionAction } from './CriterionAction';
import { CriterionQuery } from './CriterionQuery';
import { GameAction } from './GameAction';
import { GameQuery } from './GameQuery';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  public BotAction: BotAction;
  public BotQuery: BotQuery;
  public CriterionAction: CriterionAction;
  public CriterionQuery: CriterionQuery;
  public GameAction: GameAction;
  public GameQuery: GameQuery;

  //Singleton
  private static Instance: DatabaseService = null;
  public static getInstance() {
    if (this.Instance == null)
      this.Instance = new DatabaseService();
    return this.Instance;
  }
  private constructor() {
    let db = new Database('./db/stats.sql', (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Connecté à la base de données SQLite.');
    });

    this.BotAction = new BotAction(db);
    this.BotQuery = new BotQuery(db);
    this.CriterionAction = new CriterionAction(db);
    this.CriterionQuery = new CriterionQuery(db);
    this.GameAction = new GameAction(db);
    this.GameQuery = new GameQuery(db);
  }
}
