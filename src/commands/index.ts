import { printScreen } from './printScreen';
import { CommandHandler } from './CommandHandler';
import { drawCircle } from './drawCircle';
import { drawRectangle } from './drawRectangle';
import { drawSquare } from './drawSquare';
import { sendMousePosition } from './sendMousePosition';
import { moveMouseUp } from './moveMouseUp';
import { moveMouseDown } from './moveMouseDown';
import { moveMouseRight } from './moveMouseRight';
import { moveMouseLeft } from './moveMouseLeft';

const noop: CommandHandler = () => {};

// todo command history does not work
// todo test with 2nd monitor
// todo rewrite with streams

const commands: Record<string, CommandHandler> = {
    mouse_left: moveMouseLeft,
    mouse_right: moveMouseRight,
    mouse_down: moveMouseDown,
    mouse_up: moveMouseUp,
    mouse_position: sendMousePosition,
    draw_square: drawSquare,
    draw_rectangle: drawRectangle,
    draw_circle: drawCircle,
    prnt_scrn: printScreen,
};

const getCommand = (commandName: string): CommandHandler => commands[commandName] ?? noop;

export { getCommand };
