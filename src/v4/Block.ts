import IBlock from "./IBlock";
import Prop from "./Prop";
import Shape from "./Shape";
import { Colour } from "./Colour";
import { Group, Rectangle, Point } from "paper";
//import Cursor from "./Cursor";
import IVisitable from "./IVisitable";
import Transpiler from "./Transpiler";
//import Workspace from "./Workspace";

export default abstract class Block implements IBlock, IVisitable
{
    public static readonly h_padding: number = 10;
    public static readonly v_padding: number = 10;

    protected props: Prop[];

    public readonly shape: Shape;
    public readonly colour: Colour;
    public readonly js: (t: Transpiler, obj: any) => void;

    private m_group: Group;

    constructor(shape: Shape, colour: Colour, js: (t: Transpiler, obj: any) => void)
    {
        this.shape = shape;
        this.colour = colour;
        this.js = js;

        this.props = [];
    }

    public transpile(t: Transpiler)
    {
        this.js(t, this);

    }

    public draw() // recursively draw
    {
        let pos = new Point(0, 0);
        let drag = undefined;

        if (this.m_group)
        {
            pos = this.m_group.bounds.topLeft; // previous position
            drag = this.shape.path.onMouseDrag; // previous drag behaviour
        }

        this.draw_display(); // draw display
        
        this.m_group.bounds.topLeft = pos; // adjust self previous position

        this.shape.path.onMouseDrag = drag; // adjust self drag behaviour
    }

    public draw_display()
    {
        this.shape.erase(); // erase itself(important: clears events)

        let workspace = undefined; //  workspace group

        if (this.m_group)
        {
            workspace = this.m_group.parent;

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

        this.shape.colour(this.colour); // color self

        if (workspace)
        {
            workspace.addChild(this.m_group); // add back to workspace
        }
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