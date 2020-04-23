import Block from "../Block";
import { PointText, Item } from "paper";

export default class TextBlock extends Block
{
    private content: string;
    private path: PointText;

    constructor(content: string)
    {
        super();

        this.content = content;
    }

    protected draw(): void
    {
        this.path = new PointText
        ({
            point: [0, 15],
            content: this.content,
            fontSize: '1em',
            fillColor: this.stroke(),
            fontFamily: 'Roboto'
        });
    }

    public graphics(): Item
    {
        return this.path;
    }

    public width(): number
    {
        return this.path.bounds.width;
    }

    public height(): number
    {
        return this.path.bounds.height;
    }

    protected expand(w: number, h: number): void
    {
        // text does not expand
    }

    public separate(): boolean
    {
        return false; // text doesn't separate
    }

    public join(to: Block): boolean
    {
        return false; // text doesn't join
    }
    
    public stroke(): string
    {
        return 'white';
    }

    public fill(): string
    {
        return this.parent.fill();
    }

    public draggable(): boolean
    {
        return false;
    }
}