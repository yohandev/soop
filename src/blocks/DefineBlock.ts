import { BlockBase } from "./BlockBase";
import { Path } from "paper";
import BlockTextField from "./fields/BlockTextField";
import BlockBlockField from "./fields/BlockBlockField";

const SVG_DATA: string = `M.5,20.5a20,20,0,0,1,20-20h92a20,20,0,0,1,20,20v52a4,4,0,0,1-4,4h-80a5.2,5.2,0,0,0-4,2l-4,4a5.2,5.2,0,0,1-4,2h-12a5.2,5.2,0,0,1-4-2l-4-4a5.2,5.2,0,0,0-4-2h-8a4,4,0,0,1-4-4Z`;
const EXPAND_INDICES = [2, 3, 4, 5];

export default class DefineBlock extends BlockBase
{
    private path: Path;

    constructor()
    {
        super([new BlockTextField("define"), new BlockBlockField()]);

        this.color_fill = '#ff6680';
        this.color_stroke = '#f35';
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
        return 47.5;
    }

    protected add_width(w: number): void
    {
        EXPAND_INDICES.forEach(i =>
        {
            this.path.segments[i].point.x += w;
        });
    }
}