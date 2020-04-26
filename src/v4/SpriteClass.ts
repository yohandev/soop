import IClass from "./IClass";
import GoToBlock from "./GoToBlock";
import EqualsBlock from "./EqualsBlock";
import PositionXBlock from "./PositionXBlock";
import IBlock from "./IBlock";
import AndBlock from "./AndBlock";

export default class SpriteClass implements IClass
{
    public readonly extends: IClass = undefined;

    public readonly blocks: IBlock[] =
    [
        /* MOTION */
        new GoToBlock(),
        new PositionXBlock(),

        /* OPERATORS */
        new EqualsBlock(),
        new AndBlock()
    ]
}