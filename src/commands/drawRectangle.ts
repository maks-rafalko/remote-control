import {
    Button, down, left, mouse, right, up,
} from '@nut-tree/nut-js';
import { CommandHandler } from './CommandHandler';
import { easingFunction } from './easingFunction';
import { parseInt } from '../extended-functions-api/parseIntRadix10';

const drawRectangle: CommandHandler = async (args: string[]) => {
    const width = parseInt(args[0]!);
    const length = parseInt(args[1]!);

    await mouse.pressButton(Button.LEFT);

    await mouse.move(right(width), easingFunction);
    await mouse.move(down(length), easingFunction);
    await mouse.move(left(width), easingFunction);
    await mouse.move(up(length), easingFunction);

    await mouse.releaseButton(Button.LEFT);
};

export { drawRectangle };
