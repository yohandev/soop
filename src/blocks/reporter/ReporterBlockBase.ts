import BlockBase from "../BlockBase";
import { Path } from "paper";
import BlockField from "../fields/BlockField";

const SVG_DATA = `M20.5.5h45a20,20,0,0,1,20,20h0a20,20,0,0,1-20,20h-45a20,20,0,0,1-20-20h0A20,20,0,0,1,20.5.5Z`;
const EXPAND_INDICES = [1, 2, 3, 4];

export default abstract class ReporterBlockBase extends BlockBase
{
    protected path: Path;

    protected constructor(color: 'green' | 'blue', fields?: BlockField[])
    {
        super(fields);

        if (color == 'blue')
        {
            this.color_fill = '#5cb1d6';
            this.color_stroke = '#2e8eb8';
        }
        else
        {
            this.color_fill = '#59c059';
            this.color_stroke = '#389438';
        }
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
        return 26;
    }

    protected add_width(w: number): void
    {
        EXPAND_INDICES.forEach(i =>
        {
            this.path.segments[i].point.x += w;
        });
    }
}