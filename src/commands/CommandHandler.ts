import { Duplex } from 'stream';

type CommandHandler = (args: string[], webSocketStream: Duplex) => void;

export { CommandHandler };
