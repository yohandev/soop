import Drawable from "./Drawable";
import { Rectangle } from "paper";

export default interface IVisitable
{
    visit(func: (v: IVisitable) => void): void;
    intersects(b: Rectangle): boolean;
}