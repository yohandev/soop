import ReporterBlockBase from "./ReporterBlockBase";
import BlockTextField from "../fields/BlockTextField";
import BlockReporterField from "../fields/BlockReporterField";

export default class MultiplicationBlock extends ReporterBlockBase
{
    constructor()
    {
        super('green',[new BlockReporterField(), new BlockTextField("*"), new BlockReporterField()]);
    }
}