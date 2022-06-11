
export const isError = (value: any): value is Error => {
    return value instanceof Error;
}

export const isString = (value: any): value is string => {
    return typeof value === 'string';
}