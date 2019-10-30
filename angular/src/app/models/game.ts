export class Game {
    public id: number;
    public title: string;
    public shortName: string;
    public criteres: number[];

    constructor() {
        this.id = 0;
        this.shortName = "";
        this.title = "";
        this.criteres = [];
    }
}