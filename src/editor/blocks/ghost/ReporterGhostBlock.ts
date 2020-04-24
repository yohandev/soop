// import ReporterBlock from "../abstract/ReporterBlock";
// import TextBlock from "../abstract/TextBlock";
// import IGhostBlock from "./IGhostBlock";

// export default class ReporterGhostBlock extends ReporterBlock implements IGhostBlock<ReporterBlock>
// {
//     constructor()
//     {
//         super();

//         this.add_child(new TextBlock("         "));
//     }

//     public fill(): string
//     {
//         return this.parent.stroke();
//     }

//     public stroke(): string
//     {
//         return this.parent.fill();
//     }

//     public draggable(): boolean
//     {
//         return false;
//     }

//     public ghost_join(block: ReporterBlock): void
//     {
//         if (!(this.children[0] instanceof TextBlock))
//         {
//             return;
//         }
//         this.children[0].graphics().remove();
//         this.children = [];

//         this.add_child(block);
//         this.top().render(); 
//     }

//     public ghost_remove(block: ReporterBlock): void
//     {
//         if (!(this.children[0] instanceof ReporterBlock))
//         {
//             return;
//         }
//         this.children = [];
//         this.add_child(new TextBlock("         "));
//         this.top().render(); 
//     }
// }