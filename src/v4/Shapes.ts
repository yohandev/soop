import StackShape from "./StackShape";
import ReporterShape from "./ReporterShape";
import BooleanShape from "./BooleanShape";

export default class Shapes
{
    public static get STACK(): StackShape
    {
        return new StackShape();
    }

    public static get REPORTER(): ReporterShape
    {
        return new ReporterShape();
    }

    public static get BOOLEAN(): BooleanShape
    {
        return new BooleanShape();
    }
}