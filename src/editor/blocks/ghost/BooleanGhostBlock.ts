import BooleanBlock from "../abstract/BooleanBlock";
import TextBlock from "../abstract/TextBlock";
import GhostBlock from "./GhostBlock";
import { Path, Item } from "paper";
import Transpiler from "../../../vm/Transpiler";

const SVG_DATA = `M20.71.5h105l20,20h0l-20,20h-105l-20-20h0Z`;
const EXPAND_INDICES = [1, 2, 3, 4];

export default class BooleanGhostBlock extends GhostBlock<BooleanBlock>
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

    public ghost_join(block: BooleanBlock): void
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

    public ghost_separate(block: BooleanBlock): void
    {
        if (!(this.children[0] instanceof BooleanBlock))
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
            t.write('false');
        }
        else
        {
            this.children[0].transpile(t);
        }        
    }
}