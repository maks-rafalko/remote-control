const debug = (message: string): void => {
    // eslint-disable-next-line no-console
    console.log(message);
};

const error = (message: string): void => {
    // eslint-disable-next-line no-console
    console.error(message);
};

export { debug, error };
