import StackBlockBase from "../StackBlockBase";
import BlockField from "../fields/BlockField";

export default abstract class MotionBlockBase extends StackBlockBase
{
    protected constructor(fields: BlockField[] | undefined)
    {
        super(fields);

        this.color_fill = '#4C97FF';
        this.color_stroke = '#3373CC';
    }
}