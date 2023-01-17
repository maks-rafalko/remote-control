const SIGNAL_CODE_START_FROM = 128;

let cleanupHandler = (_signal: string, _code: number) => {};

const signalHandler = (signal: string, code: number) => {
    cleanupHandler(signal, code);

    process.exit(SIGNAL_CODE_START_FROM + code);
}

const nodeCleanup = (callback: (signal: string, code: number) => void) => {
    cleanupHandler = callback;

    process.on('SIGINT', signalHandler);
    process.on('SIGHUP', signalHandler);
    process.on('SIGQUIT', signalHandler);
    process.on('SIGTERM', signalHandler);
    process.on('uncaughtException', signalHandler);
};

export { nodeCleanup };