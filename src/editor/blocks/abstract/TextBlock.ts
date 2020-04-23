import Block from "../Block";
import { PointText } from "paper";

export default class TextBlock extends Block
{
    private content: string;
    private graphics: PointText;

    constructor(content: string)
    {
        super();

        this.content = content;
    }

    protected draw(drag: boolean): void
    {
        this.graphics = new PointText
        ({
            point: [0, 15],
            content: this.content,
            fontSize: '1em',
            fillColor: this.stroke(),
            fontFamily: 'Roboto'
        });
    }

    protected undraw(): void
    {
        if (this.graphics)
        {
            this.graphics.remove();
        }
    }

    public width(): number
    {
        return this.graphics.bounds.width;
    }

    public height(): number
    {
        return this.graphics.bounds.height;
    }

    protected expand(w: number, h: number): void
    {
        // text does not expand
    }

    public separate(): boolean
    {
        return false; // text doesn't separate
    }

    public translate(x: number, y: number): void
    {
        // @ts-ignore
        this.graphics.translate([x, y]);
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