import InputProp from "./InputProp";
import ReporterBlock from "./ReporterBlock";
import Shape from "./Shape";
import Shapes from "./Shapes";
import IBlock from "./IBlock";

export default class ReporterInputProp extends InputProp<ReporterBlock>
{
    constructor(parent: IBlock)
    {
        super(parent);
    }

    protected get empty(): Shape
    {
        return Shapes.REPORTER;
    }
}