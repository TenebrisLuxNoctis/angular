export class Game {
    public Id: number;
    public Title: string;
    public ShortName: string;

    constructor(title: string) {
        this.Id = 0;
        this.ShortName = "shortcut";
        this.Title = title;
    }
}