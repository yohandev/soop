import StackShape from "./StackShape";
import ReporterShape from "./ReporterShape";

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
}