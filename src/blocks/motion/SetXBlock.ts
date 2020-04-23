import MotionBlockBase from "./MotionBlockBase";
import BlockTextField from "../fields/BlockTextField";
import BlockReporterField from "../fields/BlockReporterField";

export default class SetXBlock extends MotionBlockBase
{
    constructor()
    {
        super([new BlockTextField("set x to"), new BlockReporterField()]);
    }
}