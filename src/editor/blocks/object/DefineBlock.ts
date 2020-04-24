import StackBlock from "../abstract/StackBlock";
import { Path, Item } from "paper";
import TextBlock from "../abstract/TextBlock";
import SetXBlock from "../motion/SetXBlock";
import Transpiler from "../../../vm/Transpiler";

const SVG_DATA: string = `M.5,20.5a20,20,0,0,1,20-20h92a20,20,0,0,1,20,20v52a4,4,0,0,1-4,4h-80a5.2,5.2,0,0,0-4,2l-4,4a5.2,5.2,0,0,1-4,2h-12a5.2,5.2,0,0,1-4-2l-4-4a5.2,5.2,0,0,0-4-2h-8a4,4,0,0,1-4-4Z`;
const EXPAND_INDICES = [2, 3, 4, 5];

export default class DefineBlock extends StackBlock
{
    private path: Path;

    constructor()
    {
        super();

        this.add_child(new TextBlock("define"));
        this.add_child(new SetXBlock());
    }

    public cap(): boolean
    {
        return false;
    }

    public hat(): boolean
    {
        return true;
    }

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
        return this.path.segments[5].point.y - this.path.segments[2].point.y;
    }

    protected expand(w: number, h: number): void
    {
        EXPAND_INDICES.forEach(i => this.path.segments[i].point.x += w ); // TODO expand height too
    }

    protected draggable(): boolean
    {
        return true;
    }

    public fill(): string
    {
        return '#ff6680';
    }

    public stroke(): string
    {
        return '#f35';
    }

    public transpile(t: Transpiler): void
    {
        t.writeln(`myMethod()`, true);
        t.push_scope();

        if (this.next())
        {
            this.next().transpile(t);
        }
    }
}