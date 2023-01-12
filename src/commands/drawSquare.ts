import {
    Button, down, left, mouse, right, up,
} from '@nut-tree/nut-js';
import { CommandHandler } from './CommandHandler';
import { easingFunction } from './easingFunction';
import { parseInt } from '../extended-functions-api/parseIntRadix10';
import { releaseAndPressMouseLeftButton } from '../utils';

const drawSquare: CommandHandler = async (args: string[]) => {
    const width = parseInt(args[0]!);

    await mouse.pressButton(Button.LEFT);

    await mouse.move(right(width), easingFunction);

    await releaseAndPressMouseLeftButton();

    await mouse.move(down(width), easingFunction);

    await releaseAndPressMouseLeftButton();

    await mouse.move(left(width), easingFunction);

    await releaseAndPressMouseLeftButton();

    await mouse.move(up(width), easingFunction);

    await mouse.releaseButton(Button.LEFT);
};

export { drawSquare };
