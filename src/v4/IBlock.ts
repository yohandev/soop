import Shape from "./Shape";
import { Colour } from "./Colour";
import { Group } from "paper";

export default interface IBlock // resolves circular dependencies
{
    shape: Shape;
    colour: Colour;
    group: Group;
}