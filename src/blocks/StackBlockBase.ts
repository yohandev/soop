import { Path } from "paper";
import BlockBase from "./BlockBase";
import IStackableBlock from "./IStackableBlock";

const SVG_DATA = `M.5,4.5a4,4,0,0,1,4-4h8a5.2,5.2,0,0,1,4,2l4,4a5.2,5.2,0,0,0,4,2h12a5.2,5.2,0,0,0,4-2l4-4a5.2,5.2,0,0,1,4-2h131a4,4,0,0,1,4,4v40a4,4,0,0,1-4,4H48.5a5.2,5.2,0,0,0-4,2l-4,4a5.2,5.2,0,0,1-4,2h-12a5.2,5.2,0,0,1-4-2l-4-4a5.2,5.2,0,0,0-4-2h-8a4,4,0,0,1-4-4Z`;
const EXPAND_INDICES = [10, 11, 12, 13];

export default abstract class StackBlockBase extends BlockBase implements IStackableBlock
{
    protected path: Path;

    protected create_graphics(): paper.Item
    {
        this.path = new Path(SVG_DATA);

        this.path.fillColor = this.color_fill;
        this.path.strokeColor = this.color_stroke;

        return this.path;
    }

    protected get_base_height(): number
    {
        return 30;
    }

    protected add_width(w: number): void
    {
        EXPAND_INDICES.forEach(i =>
        {
            this.path.segments[i].point.x += w;
        });
    }

    this_can_go_below(block: IStackableBlock): boolean
    {
        return true;
    }

    other_can_put_below(block: IStackableBlock): boolean
    {
        return true;
    }

    height(): number
    {
        return this.path.segments[13].point.y - this.path.segments[10].point.y;
    }

    next: (IStackableBlock & BlockBase) | undefined;
}