import ReporterBlock from "../abstract/ReporterBlock";

export default class OperatorBlock extends ReporterBlock
{
    protected draggable(): boolean
    {
        return true;
    }

    public fill(): string
    {
        return '#5cb1d6';
    }

    public stroke(): string
    {
        return '#2e8eb8';
    }
}