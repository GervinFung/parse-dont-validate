export type MutableDataStructType = 'Map' | 'Array' | 'Set';
export type ReadonlyDataStructType =
    | 'ReadonlyMap'
    | 'ReadonlyArray'
    | 'ReadonlySet';

export const getMutableType = (
    variableValue: unknown
): MutableDataStructType => {
    const type: string = Object.prototype.toString
        .call(variableValue)
        .slice(8, -1);
    switch (type) {
        case 'Map':
        case 'Array':
        case 'Set':
            return type;
    }
    throw new Error(
        'Invalid call of getType function as it is only called for check for data structure of Map, Array and Set'
    );
};

export const mapMutableTypeAsReadonlyType = (
    dataStructType: MutableDataStructType
): ReadonlyDataStructType => `Readonly${dataStructType}`;

export const isMap = (variable: unknown): variable is Map<any, any> =>
    getMutableType(variable) === 'Map';
export const isArray = (variable: unknown): variable is Array<any> =>
    getMutableType(variable) === 'Array';
export const isSet = (variable: unknown): variable is Set<any> =>
    getMutableType(variable) === 'Set';
