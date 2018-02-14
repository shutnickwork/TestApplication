export const DEFAULT_PAGE_SIZE = 10;

export function calculatePage(count: number, pageSize: number): number {
    return Math.trunc(count / pageSize) + 1;
}