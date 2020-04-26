import Prop from "./Prop"
import { Group, Path, PointText } from "paper";
import Block from "./Block";
import IBlock from "./IBlock";

export default class DropdownProp extends Prop
{
    private m_group: Group;

    private m_options: () => string[];
    private m_selected: number;

    constructor(parent: IBlock, args: any[])
    {
        super(parent);

        this.m_options = args[0];
        this.m_selected = 0;
    }

    public draw(): void
    {
        const text = new PointText
        ({
            content: this.m_options()[this.m_selected],
            fillColor: 'white',
            justification: 'center',
            fontFamily: 'Roboto',
            fontSize: '1em'
        })

        const arrow = new Path.RegularPolygon
        ({
            center: [text.bounds.right + 7 + Block.h_padding, text.bounds.center.y + 3.5],
            sides: 3,
            radius: 7,
            fillColor: this.parent.colour.fill,
            rotation: 180
        })
        const ta = new Group([text, arrow]);

        const rect = new Path.Rectangle
        ({
            width: ta.bounds.width + Block.h_padding * 2,
            height: ta.bounds.height + Block.v_padding * 2,
            fillColor: this.parent.colour.stroke,
            radius: 4
        })
        rect.bounds.center = ta.bounds.center;

        this.m_group = new Group([rect, ta]);
    }

    public get path(): paper.Item
    {
        return this.m_group;
    }

    public get width(): number
    {
        return this.m_group.children[0].bounds.width;
    }
    public set width(n: number)
    {
        return; // skipping impl ;; dropdown doesn't scale
    }

    public get height(): number
    {
        return this.m_group.children[0].bounds.width;
    }

    public set height(n: number)
    {
        return; // skipping impl ;; dropdown doesn't scale
    }

    public visit(func: (v: any) => void): void
    {
        return;
    }

    public intersects(b: paper.Rectangle): boolean
    {
        return false;
    }
}