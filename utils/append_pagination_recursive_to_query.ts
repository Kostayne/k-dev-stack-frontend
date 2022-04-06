import { PaginationRecursiveParams } from "../interfaces/pagintation_recursive";

export function appendPaginationRecursiveToQuery(query: URLSearchParams, params: PaginationRecursiveParams) {
    query.append('id', params.id.toString());
    query.append('depth', params.depth.toString());
    query.append('flatNum', params.flatNum.toString());
    query.append('offset', params.offset.toString());
}