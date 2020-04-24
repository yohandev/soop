import MotionBlock from "./MotionBlock";
import TextBlock from "../abstract/TextBlock";
import Transpiler from "../../../vm/Transpiler";
import ReporterGhostBlock from "../ghost/ReporterGhostBlock";

export default class SetYBlock extends MotionBlock
{
    constructor()
    {
        super();

        this.add_child(new TextBlock("set y to"));
        this.add_child(new ReporterGhostBlock());
    }

    public draggable(): boolean
    {
        return true;
    }

    public transpile(t: Transpiler): void
    {
        t.writeln(`this.position.y = `);
        
        this.children[1].transpile(t);
        t.write(` || this.position.y || 0;`); // safe noexcept

        if (this.next())
        {
            this.next().transpile(t);
        }
    }
}