export class Counter {
    public id: number
    public name: string;
    public value: number;
    public description: string;
}

export class Stats {
    public id: number;
    public title: string;
    public ended: boolean;
    public gameStats: Counter[];
}