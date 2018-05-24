import { noop } from '../../util';
import {
    findCommonParent,
    getOffsetParent,
    getScrollParent,
    flipPlacement,
    getReferenceOffsetWithRelativeParent,
    getPositionElementOffsets
} from './fns';
import { Placement } from './placement-type';

export interface PositionNativeJSOpts {
    placement?: Placement;
    flip?: boolean;

    onCreate?: any;
    onUpdate?: any;
    onDestory?: any;
}

export class PositionNativeJS {
    public static defaultOpts: PositionNativeJSOpts = {
        placement: 'bottom',
        flip: true,
        onCreate: noop,
        onUpdate: noop,
        onDestory: noop
    };
    private opts: PositionNativeJSOpts;

    private nodes: {
        reference: Element;
        positionElement: HTMLElement;
        commonParent: Element;
        commonOffsetParent: Element;
        scrollParent: Element;
    };

    private data: any = {
        placement: 'bottom',
        referenceOffsets: undefined,
        positionElementOffsets: undefined,
        style: ''
    };

    private created: boolean = false;
    private eventEls: (Window | Element)[];

    constructor (reference: Element, positionElement: HTMLElement, opts?: PositionNativeJSOpts) {
        this.opts = { ...PositionNativeJS.defaultOpts, ...opts };

        let commonParent = findCommonParent(reference, positionElement);
        let commonOffsetParent = getOffsetParent(commonParent.firstElementChild);
        let scrollParent = getScrollParent(reference);

        this.nodes = {
            reference,
            positionElement,
            commonParent,
            commonOffsetParent,
            scrollParent
        };

        this.update = this.update.bind(this);

        this.eventEls = [
            /HTML|BODY|#document/.test(scrollParent.nodeName) ? window : scrollParent
        ];
        this.applyListen('add');

        this.computedDataStyle();
        this.applyPlacement()
        this.applyStyle();
        this.update();
    }

    update () {
        let { opts, nodes, data } = this;
        let { commonOffsetParent, reference, scrollParent, positionElement } = nodes;
        let { offsetHeight, offsetWidth } = positionElement;
        if (!offsetHeight || !offsetWidth) {
            return;
        }

        data.referenceOffsets = getReferenceOffsetWithRelativeParent(
            commonOffsetParent,
            reference,
            scrollParent
        );

        data.placement = opts.flip ? flipPlacement(nodes, opts.placement) : opts.placement;
        this.applyPlacement()

        data.positionElementOffsets = getPositionElementOffsets(
            positionElement,
            data.referenceOffsets,
            data.placement
        );

        this.computedDataStyle();
        this.applyStyle();

        if (this.created) {
            opts.onUpdate();
        } else {
            this.created = true;
            opts.onCreate();
        }
    }

    computedDataStyle () {
        let { positionElementOffsets } = this.data;
        let style = 'position:absolute; left:0; top:0; z-index:99;';

        if (positionElementOffsets) {
            style += `transform: translate(${positionElementOffsets.left}px, ${positionElementOffsets.top}px);`;
        } else {
            style += 'pointer-events:none; opacity: 0';
        }

        this.data.style = style;
    }

    applyPlacement(){
        let { nodes: { positionElement }, data, opts } = this;
        positionElement.setAttribute('data-placement', data.placement || opts.placement)
    }

    applyStyle () {
        let { nodes: { positionElement }, data} = this;
        positionElement.setAttribute('style', data.style);
    }

    scheduleUpdate = () => requestAnimationFrame(this.update);

    applyListen (fn) {
        this.eventEls.forEach((el) => {
            el[fn + 'EventListener']('scroll', this.update);
            el[fn + 'EventListener']('resize', this.update);
        });
    }

    destory () {
        this.nodes.positionElement.removeAttribute('style');
        this.nodes.positionElement.removeAttribute('data-placement');

        this.applyListen('remove');
        this.opts.onDestory();
    }
}
