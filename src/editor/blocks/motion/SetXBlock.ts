import MotionBlock from "./MotionBlock";
import TextBlock from "../abstract/TextBlock";
import ReporterGhostBlock from "../ghost/ReporterGhostBlock";
import Transpiler from "../../../vm/Transpiler";

export default class SetXBlock extends MotionBlock
{
    constructor()
    {
        super();

        this.add_child(new TextBlock("set x to"));
        this.add_child(new ReporterGhostBlock());
    }

    public draggable(): boolean
    {
        return true;
    }

    public transpile(t: Transpiler): void
    {
        t.writeln(`this.position.x = `);
        
        this.children[1].transpile(t);
        t.write(` || this.position.x || 0;`); // safe noexcept

        if (this.next())
        {
            this.next().transpile(t);
        }
    }
}