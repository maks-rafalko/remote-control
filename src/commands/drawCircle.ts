import {
    Button, mouse, Point, straightTo,
} from '@nut-tree/nut-js';
import { CommandHandler } from './CommandHandler';
import { easingFunction } from './easingFunction';
import { parseInt } from '../extended-functions-api/parseIntRadix10';

const CIRCLE_DRAW_STEP = 0.05;

const drawCircle: CommandHandler = async (args: string[]) => {
    const radius = parseInt(args[0]!);

    const { x: currentX, y: currentY } = await mouse.getPosition();

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
};

export { drawCircle };
