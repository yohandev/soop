import { BlockBase } from "../BlockBase";
import { Path } from "paper";
import BlockField from "../fields/BlockField";

const SVG_DATA = `M20.71.5h105l20,20h0l-20,20h-105l-20-20h0Z`;
const EXPAND_INDICES = [1, 2, 3, 4];

export default abstract class BooleanBlockBase extends BlockBase
{
    protected path: Path;

    protected constructor(fields: BlockField[] | undefined)
    {
        super(fields);

        this.color_fill = '#59c059';
        this.color_stroke = '#389438';
    }

    protected create_graphics(): paper.Item
    {
        this.path = new Path(SVG_DATA);

        this.path.fillColor = this.color_fill;
        this.path.strokeColor = this.color_stroke;

        return this.path;
    }

    protected get_base_height(): number
    {
        return 26.5;
    }

    protected add_width(w: number): void
    {
        EXPAND_INDICES.forEach(i =>
        {
            this.path.segments[i].point.x += w;
        });
    }
}