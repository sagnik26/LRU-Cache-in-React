export interface valueType {
    id: number;
    text: string;
}

export interface cacheType {
    [key: string]: {key: string | number, value: valueType, next: any}
}

export interface nodeType {
    key: string | number;
    value: valueType;
    next: any;
}

