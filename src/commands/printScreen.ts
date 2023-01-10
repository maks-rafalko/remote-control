import { mouse, Region, screen } from '@nut-tree/nut-js';
// eslint-disable-next-line import/no-extraneous-dependencies
import Jimp from 'jimp';
import { Duplex } from 'stream';
import { CommandHandler } from './CommandHandler';

const SCREENSHOT_WIDTH_AND_HEIGHT = 200;

const printScreen: CommandHandler = async (_: string[], webSocketStream: Duplex) => {
    const { x: currentX, y: currentY } = await mouse.getPosition();

    const screenshotHalfWidth = SCREENSHOT_WIDTH_AND_HEIGHT / 2;

    const imageBgr = await screen.grabRegion(
        new Region(
            Math.max(0, currentX - screenshotHalfWidth),
            Math.max(0, currentY - screenshotHalfWidth),
            SCREENSHOT_WIDTH_AND_HEIGHT,
            SCREENSHOT_WIDTH_AND_HEIGHT,
        ),
    );

    const imageRgb = await imageBgr.toRGB();

    const jimpImage = new Jimp({
        data: imageRgb.data,
        width: imageRgb.width,
        height: imageRgb.height,
    });

    const base64buffer = await jimpImage.getBufferAsync(Jimp.MIME_PNG);
    const base64 = base64buffer.toString('base64');

    webSocketStream.write(`prnt_scrn ${base64}`);
};

export { printScreen };
