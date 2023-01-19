import {
    Button, mouse, Point, screen, straightTo,
} from '@nut-tree/nut-js';
import { CommandHandler } from './CommandHandler';
import { easingFunction } from './easingFunction';
import { parseInt } from '../extended-functions-api/parseIntRadix10';
import {OutOfScreenError} from "../error/OutOfScreenError";

const CIRCLE_DRAW_STEP = 0.05;

const assertMousePositionIsInsideScreen = async (currentX: number, radius: number, currentY: number): Promise<void> => {
    const screenWidth = await screen.width();
    const screenHeight = await screen.height();

    const isMousePositionWillBeOutOfScreen =
        currentX - radius < 0
        || currentY - radius < 0
        || (currentX + 2 * radius) > screenWidth
        || (currentY + radius) > screenHeight;

    if (isMousePositionWillBeOutOfScreen) {
        throw new OutOfScreenError();
    }
}

const drawCircle: CommandHandler = async (args: string[]): Promise<string> => {
    const radius = parseInt(args[0]!);

    const {x: currentX, y: currentY} = await mouse.getPosition();

    await assertMousePositionIsInsideScreen(currentX, radius, currentY);

    const centerX = currentX + radius;
    const centerY = currentY;

    await mouse.pressButton(Button.LEFT);

    for (let i = 0; i <= 2 * Math.PI; i += CIRCLE_DRAW_STEP) {
        const x = centerX - radius * Math.cos(i);
        const y = centerY - radius * Math.sin(i);

        // eslint-disable-next-line no-await-in-loop
        await mouse.move(straightTo(new Point(x, y)), easingFunction);
    }

    await mouse.releaseButton(Button.LEFT);

    return `circle was drawn with radius ${radius}`;
};

export { drawCircle };
