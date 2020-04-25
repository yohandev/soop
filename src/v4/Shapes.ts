import StackShape from "./StackShape";

export default class Shapes
{
    public static get STACK(): StackShape
    {
        return new StackShape();
    }
}