import { assertNonNullish } from './asserts';
import { parseIntRadix10 } from './extended-functions-api/parseIntRadix10';

const getNumberEnvironmentVariable = (envVarName: string): number => {
    const rawValue = process.env[envVarName];

    assertNonNullish(rawValue, 'HTTP port must be a number.');

    return parseIntRadix10(rawValue);
};

export { getNumberEnvironmentVariable };
