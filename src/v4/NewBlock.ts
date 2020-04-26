import ReporterBlock from "./ReporterBlock";
import { Colours } from "./Colour";
import TextProp from "./TextProp";
import DropdownProp from "./DropdownProp";
import Editor from "./Editor";

export default class NewBlock extends ReporterBlock
{
    constructor()
    {
        super(Colours.OBJECT);

        this.add(TextProp, "new");
        this.add(DropdownProp, (): string[] => Editor.classes.map(c => c.name));
    }
}