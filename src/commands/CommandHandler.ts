import { WebSocket } from 'ws';

type CommandHandler = (args: string[], ws: WebSocket) => void;

export { CommandHandler };
