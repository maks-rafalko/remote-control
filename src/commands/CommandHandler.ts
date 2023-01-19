import { Duplex } from 'stream';

type CommandHandler = (args: string[], webSocketStream: Duplex) => Promise<string>;

export { CommandHandler };
