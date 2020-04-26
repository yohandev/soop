import StackedBlock from "./StackedBlock";
import Shapes from "./Shapes";
import TextProp from "./TextProp";
import { Blocks } from "./Blocks";
import DispenserProp from "./DispenserProp";

export default class OverrideBlock extends StackedBlock
{
    constructor(desc: string)
    {
        const parsed = Blocks.parse(desc);

        super(Shapes.HAT, parsed.colour, true);

        this.add(TextProp, "override", "italic 700");
        //this.add(TextProp, "v");

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