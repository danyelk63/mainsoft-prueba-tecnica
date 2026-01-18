import { IPaginatedResponse } from '../../../core/models/pagination.model';
import { Observable } from 'rxjs';

export interface IStudent {
    id: number;
    name: string;
}

export class Student {
    id?: number;
    name: string;

    constructor(data: IStudent) {
        this.id = data.id;
        this.name = data.name;
    }
}

export type StudentPaginatedResponse = IPaginatedResponse<Student>;
export type StudentPaginatedObservable = Observable<StudentPaginatedResponse>;
