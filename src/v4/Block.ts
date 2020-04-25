import IBlock from "./IBlock";
import Prop from "./Prop";
import Shape from "./Shape";
import { Colour } from "./Colour";
import { Group } from "paper";

export default abstract class Block implements IBlock
{
    public static readonly padding: number = 10;

    protected props: Prop[];

    public readonly shape: Shape;
    public readonly color: Colour;

    constructor(shape: Shape, color: Colour)
    {
        this.shape = shape;
        this.color = color;

        this.props = [];
    }

    public draw() // recursively draw
    {
        if (this.shape.path)
        {
            this.shape.erase(); // <safe> erase self
        }
        this.shape.draw(); // draw self

        let maxh = this.shape.height -2 * Block.padding; // max height
        let offset = Block.padding;
        for (const prop of this.props)
        {
            if (prop.path)
            {
                prop.erase(); // <safe> erase prop
            }
            prop.draw(); // draw prop

            maxh = Math.max(maxh, prop.height); // update maxh
            offset += prop.width + Block.padding * 2; // grow
        }

        maxh += 2 * Block.padding;

        this.shape.path.position.y = maxh / 2; // vertical adjust self
        this.shape.width = offset; // width adjust self
        this.shape.height = maxh; // height adjust self

        this.shape.color(this.color); // color self

        offset = Block.padding;
        for (const prop of this.props) // adjust props
        {
            prop.path.position.x = offset + prop.width / 2; // horizontal adjust
            prop.path.position.y = maxh / 2; // vertical adjust

            this.shape.path.addChild(prop.path); // group prop

            offset += prop.width + Block.padding * 2; // grow
        }
    }

    protected add<T extends Prop>(prop: new(parent: Block, ...args: any[]) => T, ...args: any[]) // add prop
    {
        this.props.push(new prop(this, args));
    }
}