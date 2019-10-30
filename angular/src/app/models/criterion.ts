export class Criterion {
    public id: number;
    public name: string;
    public description: string;
    public resumeString: string;
    public displayedString: string;
    public isExpanded: boolean;

    constructor() {
        this.id = 0;
        this.name = "";
        this.description = "";
        this.resumeString = "";
        this.displayedString = "";
        this.isExpanded = false;
    }
}