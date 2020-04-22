import { Item, Point, Group } from "paper";
import BlockField from "./fields/BlockField";

const PADDING: number = 10;

export abstract class BlockBase
{
    public fields: BlockField[];
    public graphics: Group;

    public color_fill: string;
    public color_stroke: string;

    constructor(fields: BlockField[] | undefined)
    {
        this.color_fill = 'white'; // defaults
        this.color_stroke = 'black';

        if (fields)
        {
            this.fields = fields;
            this.fields.forEach(f => f.owner = this);
        }
        else
        {
            this.fields = [];
        }
    }

    protected abstract create_graphics(): Item;
    protected abstract get_base_height(): number;
    protected abstract add_width(w: number): void;

    public render(): void
    {
        if (this.graphics)
        {
            this.graphics.remove(); // clear
        }

        this.graphics = new Group(); // create new group
        this.graphics.addChild(this.create_graphics()); // add the base block

        let width = PADDING; // minimum width of block
        let init_width = this.graphics.firstChild.bounds.width; // initial width of empty block svg

        this.fields.forEach(f => 
        {
            f.create_graphics(); // create
            f.graphics.translate(new Point(width, this.get_base_height())); // move to rightmost of block(so far)
            
            this.graphics.addChild(f.graphics); // add to group

            width += f.graphics.bounds.width + PADDING;
        });

        this.add_width(width - init_width); // make underlying block width big enough

        // TODO make draggable more... not crap
        this.graphics.onMouseDrag = e =>
        {
            this.graphics.translate(e.delta);
        }
    }
}