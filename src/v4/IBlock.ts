import Shape from "./Shape";
import { Colour } from "./Colour";

export default interface IBlock // resolves circular dependencies
{
    shape: Shape;
    colour: Colour;
}