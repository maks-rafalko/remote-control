import {
    Button,
    Point,
    Region,
    screen,
    mouse,
    down,
    right,
    left,
    straightTo,
    up,
} from '@nut-tree/nut-js';
import { WebSocket } from 'ws';
import Jimp from 'jimp';

const CIRCLE_DRAW_STEP = 0.05;
const EASING_FUNCTION_VALUE = -0.8;
const SCREENSHOT_WIDTH_AND_HEIGHT = 200;

type CommandHandler = (args: string[], ws: WebSocket) => void;

const noop: CommandHandler = () => {};

// todo command history does not work
// todo test with 2nd monitor
// todo rewrite with streams

const easingFunction = () => EASING_FUNCTION_VALUE;

const commands: Record<string, CommandHandler> = {
    mouse_left: async (args: string[]) => {
        const deltaPx = parseInt(args[0]!, 10);
        await mouse.move(left(deltaPx), easingFunction);
    },
    mouse_right: async (args: string[]) => {
        const deltaPx = parseInt(args[0]!, 10);
        await mouse.move(right(deltaPx), easingFunction);
    },
    mouse_down: async (args: string[]) => {
        const deltaPx = parseInt(args[0]!, 10);
        await mouse.move(down(deltaPx), easingFunction);
    },
    mouse_up: async (args: string[]) => {
        const deltaPx = parseInt(args[0]!, 10);
        await mouse.move(up(deltaPx), easingFunction);
    },
    mouse_position: async (_: string[], ws: WebSocket) => {
        const position = await mouse.getPosition();

        ws.send(`mouse_position ${position.x},${position.y}`);
    },
    draw_square: async (args: string[]) => {
        const width = parseInt(args[0]!, 10);

        await mouse.pressButton(Button.LEFT);
        await mouse.move(right(width), easingFunction);
        await mouse.move(down(width), easingFunction);
        await mouse.move(left(width), easingFunction);
        await mouse.move(up(width), easingFunction);
        await mouse.releaseButton(Button.LEFT);
    },
    draw_rectangle: async (args: string[]) => {
        const width = parseInt(args[0]!, 10);
        const length = parseInt(args[1]!, 10);

        await mouse.pressButton(Button.LEFT);
        await mouse.move(right(width), easingFunction);
        await mouse.move(down(length), easingFunction);
        await mouse.move(left(width), easingFunction);
        await mouse.move(up(length), easingFunction);
        await mouse.releaseButton(Button.LEFT);
    },
    draw_circle: async (args: string[]) => {
        const radius = parseInt(args[0]!, 10);

        const { x: currentX, y: currentY } = await mouse.getPosition();

        const centerX = currentX + radius;
        const centerY = currentY;

        await mouse.pressButton(Button.LEFT);

        for (let i = 0; i <= 2 * Math.PI; i += CIRCLE_DRAW_STEP) {
            const x = centerX - radius * Math.cos(i);
            const y = centerY - radius * Math.sin(i);

            await mouse.move(straightTo(new Point(x, y)), easingFunction);
        }

        await mouse.releaseButton(Button.LEFT);
    },
    prnt_scrn: async (_: string[], ws: WebSocket) => {
        const { x: currentX, y: currentY } = await mouse.getPosition();

        const screenshotHalfWidth = SCREENSHOT_WIDTH_AND_HEIGHT / 2;

        const image = await screen.grabRegion(new Region(
            Math.max(0, currentX - screenshotHalfWidth),
            Math.max(0, currentY - screenshotHalfWidth),
            SCREENSHOT_WIDTH_AND_HEIGHT,
            SCREENSHOT_WIDTH_AND_HEIGHT,
        ));

        const jimpImage = new Jimp({
            data: image.data,
            width: image.width,
            height: image.height,
        });

        const base64buffer = await jimpImage.getBufferAsync(Jimp.MIME_PNG);
        const base64 = base64buffer.toString('base64');

        ws.send(`prnt_scrn ${base64}`);
    },
};

const getCommand = (commandName: string): CommandHandler => commands[commandName] ?? noop;

export { getCommand };
