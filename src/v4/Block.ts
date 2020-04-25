import IBlock from "./IBlock";
import Prop from "./Prop";
import Shape from "./Shape";
import { Colour } from "./Colour";
import { Group } from "paper";
import Cursor from "./Cursor";

export default abstract class Block implements IBlock
{
    public static readonly h_padding: number = 10;
    public static readonly v_padding: number = 10;

    protected props: Prop[];

    public readonly shape: Shape;
    public readonly colour: Colour;

    private m_group: Group;

    constructor(shape: Shape, colour: Colour)
    {
        this.shape = shape;
        this.colour = colour;

        this.props = [];
    }

    public draw() // recursively draw
    {
        if (this.m_group)
        {
            this.m_group.remove();
        }
        this.m_group = new Group();

        this.shape.draw(); // draw self
        this.m_group.addChild(this.shape.path);

        let maxh = this.shape.height -2 * Block.v_padding; // max height
        let offset = Block.h_padding;
        for (const prop of this.props)
        {
            prop.draw(); // draw prop
            this.m_group.addChild(prop.path); // group prop

            maxh = Math.max(maxh, prop.height); // update maxh
            offset += prop.width + Block.h_padding; // grow
        }

        maxh += 2 * Block.v_padding;
        offset = Block.h_padding;

        for (const prop of this.props) // adjust props
        {
            prop.path.position.x = offset + prop.width / 2; // horizontal adjust
            prop.path.position.y = maxh / 2; // vertical adjust

            offset += prop.width + Block.h_padding; // grow
        }

        this.m_group.position.y = maxh / 2; // vertical adjust self
        this.shape.width = offset; // width adjust self
        this.shape.height = maxh; // height adjust self

        this.shape.colour(this.colour); // color self

        this.shape.path.onMouseDrag = e => Cursor.drag(this, e); // draggable
    }

    protected add<T extends Prop>(prop: new(parent: Block, ...args: any[]) => T, ...args: any[]) // add prop
    {
        this.props.push(new prop(this, args));
    }

    public get group(): Group
    {
        return this.m_group;
    }
}