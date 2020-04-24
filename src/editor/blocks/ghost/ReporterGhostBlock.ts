import BooleanBlock from "../abstract/BooleanBlock";
import TextBlock from "../abstract/TextBlock";
import GhostBlock from "./GhostBlock";
import { Path, Item } from "paper";
import ReporterBlock, { SVG_DATA, EXPAND_INDICES } from "../abstract/ReporterBlock";
import Transpiler from "../../../vm/Transpiler";

export default class ReporterGhostBlock extends GhostBlock<ReporterBlock>
{
    private path: Path;

    constructor()
    {
        super();

        this.add_child(new TextBlock("         "));
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
        return this.path.bounds.height;
    }

    protected expand(w: number, h: number): void
    {
        EXPAND_INDICES.forEach(i => this.path.segments[i].point.x += w ); // TODO expand height too
    }

    public fill(): string
    {
        return this.parent.stroke();
    }

    public stroke(): string
    {
        return this.parent.fill();
    }

    public ghost_join(block: ReporterBlock): void
    {
        if (!(this.children[0] instanceof TextBlock))
        {
            return;
        }
        this.children[0].graphics().remove();
        this.children = [];

        this.add_child(block);
        this.top().render(); 
    }

    public ghost_separate(block: ReporterBlock): void
    {
        if (!(this.children[0] instanceof ReporterBlock))
        {
            return;
        }
        this.children = [];
        this.add_child(new TextBlock("         "));
        this.top().render(); 
    }

    public transpile(t: Transpiler): void
    {
        if (this.children[0] instanceof TextBlock)
        {
            t.write('undefined');
        }
        else
        {
            this.children[0].transpile(t);
        }        
    }
}