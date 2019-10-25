export class Criterion {
    public Id: number;
    public Name: string;
    public Description: string;
    public ResumeString: string;
    public DisplayedString: string;
    public isExpanded: boolean;

    constructor(name: string) {
        this.Id = 1;
        this.Name = name;
        this.Description = "Champ de description du critère";
        this.ResumeString = "test# pour la science";
        this.DisplayedString = "& " + name + "# pour la science";
        this.isExpanded = false;
    }
}