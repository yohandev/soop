import { OperatorReporterBlock } from "./OperatorBlock";
import TextBlock from "../abstract/TextBlock";
import ReporterGhostBlock from "../ghost/ReporterGhostBlock";
import Transpiler from "../../../vm/Transpiler";

export default class MultiplyBlock extends OperatorReporterBlock
{
    constructor()
    {
        super();

        this.add_child(new ReporterGhostBlock());
        this.add_child(new TextBlock("*"))
        this.add_child(new ReporterGhostBlock());
    }

    public draggable(): boolean
    {
        return true;
    }

    public transpile(t: Transpiler): void
    {
        t.write(`(`);
        this.children[0].transpile(t);

        t.write(` * `);

        this.children[2].transpile(t);
        t.write(`)`);
    }
}