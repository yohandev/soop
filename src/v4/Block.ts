import IBlock from "./IBlock";
import Prop from "./Prop";
import Shape from "./Shape";
import { Colour } from "./Colour";
import { Group, Rectangle } from "paper";
import Cursor from "./Cursor";
import IVisitable from "./IVisitable";
import Drawable from "./Drawable";

export default abstract class Block implements IBlock, IVisitable
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
        let pos = paper.project.view.center; // default pos

        this.shape.erase(); // erase itself(important: clears events)

        if (this.m_group)
        {
            pos = this.m_group.bounds.topLeft; // previous pos

            this.m_group.onMouseDrag = undefined;
            this.m_group.remove();
        }
        this.m_group = new Group();

        this.shape.draw(); // draw self
        this.m_group.addChild(this.shape.path);

        let maxh = this.shape.height -2 * Block.v_padding; // max height
        let offset = Block.h_padding;
        for (const prop of this.props)
        {
            prop.erase();
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

        this.m_group.bounds.topLeft = pos; // adjust self previous position

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

    public visit(func: (v: IVisitable) => void): void
    {
        func(this);

        this.props.forEach(p => p.visit(func));
    }

    public intersects(b: Rectangle): boolean
    {
        return this.shape.path.bounds.intersects(b);
    }

    public abstract connect(b: Block | Prop): boolean; // join a new parent
    public abstract disconnect(): boolean; // separate from its parent, if any

    public abstract get top(): Block; // top-most parent
}