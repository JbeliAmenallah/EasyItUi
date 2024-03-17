import { Project } from "./project";

export interface Functionality {
    id?: number;
    functionalityName: string;
    descriptionFunctionality: string;
    priority: number;
    status: string;
    complexityLevel: string;
    startDate ?: Date;
    endDate: Date;
    previousTask?: number;
    nextTask?: number;
    parentTask?: string;
    projectId: number;
    project?: Project; 

}
