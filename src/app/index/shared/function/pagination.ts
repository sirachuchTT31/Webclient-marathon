export function countIndex(pageSize: number, current_page: number, index: number) {
    return pageSize * (current_page - 1) + index;
}