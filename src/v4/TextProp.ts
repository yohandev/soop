import Prop from "./Prop";
import { PointText, Rectangle } from "paper";
import IBlock from "./IBlock";
import IVisitable from "./IVisitable";

export default class TextProp extends Prop
{
    private content: string;
    private text: PointText;

    constructor(parent: IBlock, content: string)
    {
        super(parent);

        this.content = content;
    }

    public draw(): void
    {
        this.text = new PointText
        ({
            point: [0, 0],
            content: this.content,
            fontSize: '1em',
            fillColor: 'white',
            fontFamily: 'Roboto'
        });
    }

    public get path(): paper.Item
    {
        return this.text;
    }

    public get width(): number
    {
        return this.text.bounds.width;
    }

    public set width(n: number)
    {
        // skipping impl ;; text doesn't need to scale
    }

    public get height(): number
    {
        return this.text.bounds.height;
    }

    public set height(n: number)
    {
        // skipping impl ;; text doesn't need to scale
    }

    public visit(func: (v: IVisitable) => void): void
    {
        return;
    }

    public intersects(b: Rectangle): boolean
    {
        return false;
    }
}