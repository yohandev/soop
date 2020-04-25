import StackShape from "./StackShape";
import ReporterShape from "./ReporterShape";
import BooleanShape from "./BooleanShape";

export type ShapeType = 'stack' | 'reporter' | 'boolean';

export default class Shapes
{
    public static get STACK(): StackShape
    {
        return new StackShape('stack');
    }

    public static get REPORTER(): ReporterShape
    {
        return new ReporterShape('reporter');
    }

    public static get BOOLEAN(): BooleanShape
    {
        return new BooleanShape('boolean');
    }
}