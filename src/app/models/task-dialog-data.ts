import { Contributor } from "./Contributor";

export class TaskDialogData {
    title: string;
    description: string;
    assignee: Contributor;
    contributors: Contributor[];
}