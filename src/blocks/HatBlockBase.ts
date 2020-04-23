import BlockBase from "./BlockBase";
import IStackableBlock from "./IStackableBlock";

export default abstract class HatBlockBase extends BlockBase implements IStackableBlock
{
    this_can_go_below(block: IStackableBlock): boolean
    {
        return false;
    }

    other_can_put_below(block: IStackableBlock): boolean
    {
        return true;
    }

    abstract height(): number;
}