import ReporterBlockBase from "./ReporterBlockBase";
import BlockTextField from "../fields/BlockTextField";
import BlockReporterField from "../fields/BlockReporterField";

export default class AdditionBlock extends ReporterBlockBase
{
    constructor(a?: ReporterBlockBase, b?: ReporterBlockBase)
    {
        super('green',[new BlockReporterField(), new BlockTextField("+"), new BlockReporterField()]);

        if (a)
        {
            (this.fields[0] as BlockReporterField).value = a;
        }
        if (b)
        {
            (this.fields[0] as BlockReporterField).value = b;
        }
    }
}