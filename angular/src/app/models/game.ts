export class Game {
    public id: number;
    public title: string;
    public shortName: string;

    constructor(title: string) {
        this.id = 0;
        this.shortName = "shortcut";
        this.title = title;
    }
}