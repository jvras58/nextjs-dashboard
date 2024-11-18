export interface FetchAndSumHookReturn<T> {
    data: T[];
    total: number;
    loading: boolean;
    error: Error | null;
}
