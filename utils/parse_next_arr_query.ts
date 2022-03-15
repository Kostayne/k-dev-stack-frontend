export function parseArrQuery(query: string | string[] | undefined) {
    let arr = query as string[];

	if (!query) {
		arr = [];
	}

	if (typeof query == 'string') {
		arr = [query];
	}

    return arr;
}