import Prop from "./Prop";
import { PointText } from "paper";
import IBlock from "./IBlock";

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
            content: this.content,
            fontSize: '1em',
            fillColor: 'white',
            fontFamily: 'Roboto'
        });
    }

    public erase(): void
    {
        this.text.remove();
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
}