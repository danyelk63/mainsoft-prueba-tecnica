export interface IPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface IPaginatedResponse<T> {
    data: T[];
    pagination: IPagination;
}

export type PaginatedObservable<T> = import('rxjs').Observable<IPaginatedResponse<T>>;
