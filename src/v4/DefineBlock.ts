import StackedBlock from "./StackedBlock";
import Shapes from "./Shapes";
import TextProp from "./TextProp";
import { Blocks } from "./Blocks";
import DispenserProp from "./DispenserProp";

export default class DefineBlock extends StackedBlock
{
    constructor(desc: string)
    {
        const parsed = Blocks.parse(desc);

        super(Shapes.HAT, parsed.colour, true);

        this.add(TextProp, "define", "italic 700");

        for (const prop of parsed.props)
        {
            switch (prop.type)
            {
                case "text":
                    this.add(TextProp, ...prop.args);
                    break;
                case "reporter":
                    this.add(DispenserProp, Shapes.REPORTER, ...prop.args);
                    break;
                case "boolean":
                    this.add(DispenserProp, Shapes.BOOLEAN, ...prop.args);
                    break;
                default:
                    break;
            }
        }
    }
}