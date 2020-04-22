import BooleanBlockBase from "./BooleanBlockBase";
import BlockTextField from "../fields/BlockTextField";
import BlockBooleanField from "../fields/BlockBooleanField";

export default class EqualBlock extends BooleanBlockBase
{
    constructor()
    {
        super([new BlockBooleanField(), new BlockTextField("="), new BlockBooleanField()]);
    }
}