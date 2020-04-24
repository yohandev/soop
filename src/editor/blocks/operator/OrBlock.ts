import BooleanGhostBlock from "../ghost/BooleanGhostBlock";
import TextBlock from "../abstract/TextBlock";
import { OperatorBooleanBlock } from "./OperatorBlock";
import Transpiler from "../../../vm/Transpiler";

export default class OrBlock extends OperatorBooleanBlock
{
    constructor()
    {
        super();

        this.add_child(new BooleanGhostBlock());
        this.add_child(new TextBlock("or"))
        this.add_child(new BooleanGhostBlock());
    }

    public draggable(): boolean
    {
        return true;
    }

    public transpile(t: Transpiler): void
    {
        t.write(`(`);
        this.children[0].transpile(t);

        t.write(` || `);

        this.children[2].transpile(t);
        t.write(`)`);
    }
}