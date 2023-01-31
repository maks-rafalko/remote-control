function assertNonNullish<TValue>(value: TValue, message: string): asserts value is NonNullable<TValue> {
    if (value === null || value === undefined) {
        throw new Error(message);
    }
}

export {
    assertNonNullish,
};
