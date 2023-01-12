import { Button, mouse } from '@nut-tree/nut-js';

/**
 * This is done between movements of mouse for more narrow
 * drawing on the canvas
 */
const releaseAndPressMouseLeftButton = async () => {
    await mouse.releaseButton(Button.LEFT);
    await mouse.pressButton(Button.LEFT);
};

export { releaseAndPressMouseLeftButton };
