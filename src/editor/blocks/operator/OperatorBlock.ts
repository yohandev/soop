import BooleanBlock from "../abstract/BooleanBlock";
import ReporterBlock from "../abstract/ReporterBlock";

export abstract class OperatorBooleanBlock extends BooleanBlock
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

export abstract class OperatorReporterBlock extends ReporterBlock
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