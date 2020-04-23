import { Path } from "paper";
import StackBlock from "../abstract/StackBlock";
import { Cursor } from "../../Cursor";

const SVG_DATA = `M.5,4.5a4,4,0,0,1,4-4h8a5.2,5.2,0,0,1,4,2l4,4a5.2,5.2,0,0,0,4,2h12a5.2,5.2,0,0,0,4-2l4-4a5.2,5.2,0,0,1,4-2h131a4,4,0,0,1,4,4v40a4,4,0,0,1-4,4H48.5a5.2,5.2,0,0,0-4,2l-4,4a5.2,5.2,0,0,1-4,2h-12a5.2,5.2,0,0,1-4-2l-4-4a5.2,5.2,0,0,0-4-2h-8a4,4,0,0,1-4-4Z`;
const EXPAND_INDICES = [10, 11, 12, 13];

export default abstract class MotionBlock extends StackBlock
{
    protected path: Path;

    protected draw(drag: boolean): void
    {
        this.path = new Path(SVG_DATA);

        this.path.fillColor = this.fill();
        this.path.strokeColor = this.stroke();

        if (drag)
        {
            this.path.onMouseDrag = e => Cursor.drag(this, e);
        }
    }

    protected undraw(): void
    {
        if (this.path)
        {
            this.path.remove();
        }
    }

    public width(): number
    {
        return this.path.bounds.width;
    }

    public height(): number
    {
        //return this.path.bounds.height;
        return this.path.segments[13].point.y - this.path.segments[10].point.y;
    }

    protected expand(w: number, h: number): void
    {
        EXPAND_INDICES.forEach(i => this.path.segments[i].point.x += w ); // TODO expand height too
    }

    public translate(x: number, y: number): void
    {
        // @ts-ignore
        this.path.translate([x, y]);
    }

    public fill(): string
    {
        return '#4C97FF';
    }

    public stroke(): string
    {
        return '#3373CC';
    }

    public cap(): boolean
    {
        return false;
    }

    public hat(): boolean
    {
        return false;
    }
}