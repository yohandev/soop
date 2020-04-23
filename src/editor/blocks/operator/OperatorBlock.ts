import BooleanBlock from "../abstract/BooleanBlock";

export default abstract class OperatorBlock extends BooleanBlock
{
    public fill(): string
    {
        return '#59c059';
    }

    public stroke(): string
    {
        return '#389438';
    }
}