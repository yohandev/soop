import MotionBlockBase from "./MotionBlockBase";
import BlockTextField from "../fields/BlockTextField";
import BlockBooleanField from "../fields/BlockBooleanField";

export default class SetXBlock extends MotionBlockBase
{
    constructor()
    {
        super([new BlockTextField("set x to"), new BlockBooleanField()]);
    }
}