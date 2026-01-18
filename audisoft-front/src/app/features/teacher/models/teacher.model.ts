import { IPaginatedResponse } from '../../../core/models/pagination.model';
import { Observable } from 'rxjs';

export interface ITeacher {
    id: number;
    name: string;
}

export class Teacher {
    id?: number;
    name: string;

    constructor(data: ITeacher) {
        this.id = data.id;
        this.name = data.name;
    }
}

export type TeacherPaginatedResponse = IPaginatedResponse<Teacher>;
export type TeacherPaginatedObservable = Observable<TeacherPaginatedResponse>;
