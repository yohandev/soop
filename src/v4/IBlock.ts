import Shape from "./Shape";
import { Colour } from "./Colour";
import { Group } from "paper";
import { ITranspilerTarget } from "./Transpiler";

export default interface IBlock extends ITranspilerTarget // resolves circular dependencies
{
    shape: Shape;
    colour: Colour;
    group: Group;
}