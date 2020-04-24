import Block from "../Block";
import { Path, Item } from "paper";
import BooleanGhostBlock from "../ghost/BooleanGhostBlock";
import IGhostBlock from "../ghost/GhostBlock";

const SVG_DATA = `M20.71.5h105l20,20h0l-20,20h-105l-20-20h0Z`;
const EXPAND_INDICES = [1, 2, 3, 4];

export default abstract class BooleanBlock extends Block
{
    protected path: Path;

    protected draw(): void
    {
        this.path = new Path(SVG_DATA);
        
        this.path.fillColor = this.fill();
        this.path.strokeColor = this.stroke();
    }

    public graphics(): Item
    {
        return this.path;
    }

    public width(): number
    {
        return this.path.bounds.width;
    }

    public height(): number
    {
        return this.path.bounds.height;
    }

    protected expand(w: number, h: number): void
    {
        EXPAND_INDICES.forEach(i => this.path.segments[i].point.x += w ); // TODO expand height too
    }

    public separate(): boolean
    {
        if (!this.parent)
        {
            return false;
        }

        (this.parent as any as IGhostBlock<BooleanBlock>).ghost_remove(this);
        this.parent = undefined;

        return true;
    }

    public join(to: Block): boolean
    {
        if (!this.can_join(to))
        {
            return false;
        }
        (to as any as IGhostBlock<BooleanBlock>).ghost_join(this);
    }

    public can_join(to: Block): boolean
    {
        return to instanceof BooleanGhostBlock; // TODO || ReporterGhostBlock
    }
}