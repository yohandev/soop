import Block from "../Block";
import { Path, Item } from "paper";
import BooleanGhostBlock from "../ghost/BooleanGhostBlock";
import GhostBlock from "../ghost/GhostBlock";
import ReporterGhostBlock from "../ghost/ReporterGhostBlock";

export const SVG_DATA = `M20.5.5h45a20,20,0,0,1,20,20h0a20,20,0,0,1-20,20h-45a20,20,0,0,1-20-20h0A20,20,0,0,1,20.5.5Z`;
export const EXPAND_INDICES = [1, 2, 3, 4];

export default abstract class ReporterBlock extends Block
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

        (this.parent as GhostBlock<ReporterBlock>).ghost_separate(this);
        this.parent = undefined;

        return true;
    }

    public join(to: Block): boolean
    {
        if (!this.can_join(to))
        {
            return false;
        }
        (to as GhostBlock<ReporterBlock>).ghost_join(this);
    }

    public can_join(to: Block): boolean
    {
        return to instanceof ReporterGhostBlock; // TODO || ReporterGhostBlock
    }
}