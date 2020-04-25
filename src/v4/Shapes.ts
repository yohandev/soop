import StackShape from "./StackShape";
import ReporterShape from "./ReporterShape";
import BooleanShape from "./BooleanShape";
import HatShape from "./HatShape";

export type ShapeType = 'stack' | 'reporter' | 'boolean' | 'hat';

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

    public static get HAT(): HatShape
    {
        return new HatShape('hat');
    }
}