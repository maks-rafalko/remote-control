import {
    Button, down, left, mouse, right, screen, up,
} from '@nut-tree/nut-js';
import { CommandHandler } from './CommandHandler';
import { easingFunction } from './easingFunction';
import { parseInt } from '../extended-functions-api/parseIntRadix10';
import { releaseAndPressMouseLeftButton } from '../utils';
import {OutOfScreenError} from "../error/OutOfScreenError";

async function assertMousePositionIsInsideScreen(width: number) {
    const {x: currentX, y: currentY} = await mouse.getPosition();

    const screenWidth = await screen.width();
    const screenHeight = await screen.height();

    const isMousePositionWillBeOutOfScreen =
        (currentX + width) > screenWidth
        || (currentY + width) > screenHeight;

    if (isMousePositionWillBeOutOfScreen) {
        throw new OutOfScreenError();
    }
}

const drawSquare: CommandHandler = async (args: string[]) => {
    const width = parseInt(args[0]!);

    await assertMousePositionIsInsideScreen(width);

    await mouse.pressButton(Button.LEFT);

    await mouse.move(right(width), easingFunction);

    await releaseAndPressMouseLeftButton();

    await mouse.move(down(width), easingFunction);

    await releaseAndPressMouseLeftButton();

    await mouse.move(left(width), easingFunction);

    await releaseAndPressMouseLeftButton();

    await mouse.move(up(width), easingFunction);

    await mouse.releaseButton(Button.LEFT);

    return `square was drawn with width ${width}`;
};

export { drawSquare };
