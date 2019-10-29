export class Criterion {
    public id: number;
    public name: string;
    public description: string;
    public resumeString: string;
    public displayedString: string;
    public isExpanded: boolean;

    constructor(name: string) {
        this.id = 1;
        this.name = name;
        this.description = "Champ de description du critère";
        this.resumeString = "test# pour la science";
        this.displayedString = "& " + name + "# pour la science";
        this.isExpanded = false;
    }
}