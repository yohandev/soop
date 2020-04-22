import StackBlock from "./StackBlock";

export default class SetYBlock extends StackBlock
{
    protected draw(): void
    {
        this.graphics_begin();
        this.graphics_append_text("set y to");
        this.graphics_append_reporter_slot();
        this.graphics_make_connector();
        this.graphics_make_connectable();
        this.graphics_end("#2a70bf");
    }
}