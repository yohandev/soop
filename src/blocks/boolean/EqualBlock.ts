import BooleanBlockBase from "./BooleanBlockBase";
import BlockTextField from "../fields/BlockTextField";
import BlockBooleanField from "../fields/BlockBooleanField";

export default class EqualBlock extends BooleanBlockBase
{
    constructor(a?: BooleanBlockBase, b?: BooleanBlockBase)
    {
        super([new BlockBooleanField(), new BlockTextField("="), new BlockBooleanField()]);

        if (a)
        {
            (this.fields[0] as BlockBooleanField).value = a;
        }
        if (b)
        {
            (this.fields[0] as BlockBooleanField).value = b;
        }
    }
}