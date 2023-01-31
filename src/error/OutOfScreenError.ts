class OutOfScreenError extends Error {
    constructor(message = 'Mouse position will be out of screen. Rejected operation.') {
        super(message);
        this.name = 'OutOfScreenError';
    }
}

export { OutOfScreenError };
