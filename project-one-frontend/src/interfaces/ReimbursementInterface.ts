import { UserInterface } from "./UserInterface";

export interface ReimbursementInterface {
    reimbId?:number,
    status?:number,
    user?:UserInterface,
    amount:number,
    description?:string,
}