export function appendArrToQuery(builder: URLSearchParams, fileldName: string, values: string[] | number[]) {
    values.forEach((v, i) => {
        builder.append(fileldName, v.toString());
    });
}