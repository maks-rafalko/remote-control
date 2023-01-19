import {
    Button, down, left, mouse, right, screen, up,
} from '@nut-tree/nut-js';
import { CommandHandler } from './CommandHandler';
import { easingFunction } from './easingFunction';
import { parseInt } from '../extended-functions-api/parseIntRadix10';
import { releaseAndPressMouseLeftButton } from '../utils';
import {OutOfScreenError} from "../error/OutOfScreenError";

async function assertMousePositionIsInsideScreen(width: number, length: number) {
    const {x: currentX, y: currentY} = await mouse.getPosition();

    const screenWidth = await screen.width();
    const screenHeight = await screen.height();

    const isMousePositionWillBeOutOfScreen =
        (currentX + width) > screenWidth
        || (currentY + length) > screenHeight;

    if (isMousePositionWillBeOutOfScreen) {
        throw new OutOfScreenError();
    }
}

const drawRectangle: CommandHandler = async (args: string[]) => {
    const width = parseInt(args[0]!);
    const length = parseInt(args[1]!);

    await assertMousePositionIsInsideScreen(width, length);

    await mouse.pressButton(Button.LEFT);

    await mouse.move(right(width), easingFunction);

    await releaseAndPressMouseLeftButton();

    await mouse.move(down(length), easingFunction);

    await releaseAndPressMouseLeftButton();

    await mouse.move(left(width), easingFunction);

    await releaseAndPressMouseLeftButton();

    await mouse.move(up(length), easingFunction);

    await mouse.releaseButton(Button.LEFT);

    return `rectangle was drawn with width ${width} and length ${length}`;
};

export { drawRectangle };
