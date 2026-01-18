import { IPaginatedResponse } from '../../../core/models/pagination.model';
import { Observable } from 'rxjs';

export interface IGrade {
    id: number;
    name: string;
    teacherId: number;
    studentId: number;
    value: number;
}

export class Grade {
    id?: number;
    name: string;
    teacherId: number;
    studentId: number;
    value: number;

    constructor(data: IGrade) {
        this.id = data.id;
        this.name = data.name;
        this.teacherId = data.teacherId;
        this.studentId = data.studentId;
        this.value = data.value;
    }
}

export type GradePaginatedResponse = IPaginatedResponse<Grade>;
export type GradePaginatedObservable = Observable<GradePaginatedResponse>;
