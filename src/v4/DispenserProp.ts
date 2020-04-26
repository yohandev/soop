import Prop from "./Prop";
import IVisitable from "./IVisitable";
import Shape from "./Shape";
import { PointText, Group } from "paper";
import IBlock from "./IBlock";
import Block from "./Block";
import Workspace from "./Workspace";
import { Blocks } from "./Blocks";
import { Colours } from "./Colour";

export default class DispenserProp extends Prop
{
    private m_shape: Shape;
    private m_group: Group;

    public readonly content: string;

    constructor(parent: IBlock, args: any[])
    {
        super(parent);

        console.log(args);

        this.m_shape = args[0];
        this.content = args[1] || "n";
    }

    public visit(func: (v: IVisitable) => void): void
    {
        return; // can't visit dispensers
    }

    public intersects(b: paper.Rectangle): boolean
    {
        return false; // can't intersect dispensers
    }

    public draw(): void
    {
        this.m_group = new Group();

        this.m_shape.draw(); // shape
        this.m_shape.colour(this.parent.colour);
        this.m_group.addChild(this.m_shape.path);

        const text = new PointText // text
        ({
            point: [0, 0],
            content: this.content,
            fontSize: '1em',
            fillColor: 'white',
            fontFamily: 'Roboto'
        })
        this.m_group.addChild(text);

        this.m_shape.width = Math.max(50, text.bounds.width + Block.h_padding * 2);
        this.m_shape.height = text.bounds.height + Block.v_padding * 2;
        
        text.bounds.center = this.m_shape.path.bounds.center; // align

        this.m_shape.path.onMouseDown = e => 
        {
            Workspace.active.add(Blocks.create(this.desc()));
        }
    }

    public get path(): paper.Item
    {
        return this.m_group;
    }

    public get width(): number
    {
        return this.m_shape.width;
    }

    public set width(n: number)
    {
        this.m_shape.width = n;
    }

    public get height(): number
    {
        return this.m_shape.height;
    }

    public set height(n: number)
    {
        this.m_shape.height = n;
    }

    private desc(): string
    {
        return `
        {
            shape: '${this.m_shape.type}',
            category: '${this.colour()}',
            props:
            [
                { type: 'text', args: ['${this.content}'] }
            ]
        }`
    }

    private colour(): string
    {
        for (const c in Colours)
        {
            if ((Colours as any)[c] === this.parent.colour)
            {
                return c;
            }
        }
    }
}