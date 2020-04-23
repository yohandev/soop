import MotionBlockBase from "./MotionBlockBase";
import BlockTextField from "../fields/BlockTextField";
import BlockReporterField from "../fields/BlockReporterField";
import ReporterBlockBase from "../reporter/ReporterBlockBase";

export default class SetXBlock extends MotionBlockBase
{
    constructor(a?: ReporterBlockBase)
    {
        super([new BlockTextField("set x to"), new BlockReporterField()]);

        if (a)
        {
            (this.fields[1] as BlockReporterField).value = a;
        }
    }
}