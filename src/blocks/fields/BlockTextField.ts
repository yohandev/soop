import BlockField from "./BlockField";
import { Group, PointText } from "paper";

export default class BlockTextField extends BlockField
{
    public content: string;

    constructor(content: string)
    {
        super('text');

        this.content = content;
    }

    public create_graphics(): void
    {
        this.graphics = new PointText
        ({
            point: [0, 0],
            content: this.content,
            fontSize: '1em',
            fillColor: 'white',
            fontFamily: 'Roboto'
        });
    }
}