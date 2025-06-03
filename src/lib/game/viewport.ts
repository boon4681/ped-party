import * as PIXI from 'pixi.js';
import { TextureStyle } from 'pixi.js';

export class Viewport extends PIXI.Application {
    private resizeObserver = new ResizeObserver((entries) => {
        if (!this.container) return
        this._resize_(this.container.getBoundingClientRect())
    });
    constructor(protected container: HTMLDivElement, private options: {
        width: number,
        height: number
    }) {
        super()
    }

    readonly mount = async () => {
        TextureStyle.defaultOptions.scaleMode = 'nearest';
        await this.init({
            // background: '#8D9C5B',
            backgroundAlpha: 0,
            resolution: 1,
            autoDensity: true,
            antialias: true,
            width: this.options.width,
            height: this.options.height,
        })
        this._resize_(this.container.getBoundingClientRect())
        this.container.appendChild(this.canvas);
        this.resizeObserver.observe(this.container)
    }
    readonly unmount = async () => {
        this.resizeObserver.disconnect()
        this.destroy()
    }

    readonly _resize_ = (rect: DOMRect) => {
        const containerWidth = rect.width ?? 0;
        const containerHeight = rect.height ?? 0;
        const scale = Math.min(containerWidth / this.options.width, containerHeight / this.options.height);
        const enlargedWidth = Math.floor(scale * this.options.width);
        const enlargedHeight = Math.floor(scale * this.options.height);
        // margins for centering our game
        const horizontalMargin = (containerWidth - enlargedWidth) / 2;
        const verticalMargin = (containerHeight - enlargedHeight) / 2;
        let style = this.canvas.style;
        style.width = `${enlargedWidth}px`;
        style.height = `${enlargedHeight}px`;
        style.marginLeft = style.marginRight = `${horizontalMargin}px`;
        style.marginTop = style.marginBottom = `${verticalMargin}px`;
        console.log(this.stage.worldTransform)
    }
}