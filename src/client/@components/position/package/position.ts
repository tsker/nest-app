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

    private created: boolean = false;
    private eventEls: (Window | Element)[];

    public data: any = {
        placement: 'bottom',
        referenceOffsets: undefined,
        positionElementOffsets: undefined,
        style: ''
    };

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

        this.applyStyle();

        if (this.created) {
            opts.onUpdate();
        } else {
            this.created = true;
            opts.onCreate();
        }
    }

    applyPlacement(){
        let { nodes: { positionElement }, data, opts } = this;
        positionElement.setAttribute('data-placement', data.placement || opts.placement)
    }

    applyStyle () {
        let { nodes: { positionElement }, data:{positionElementOffsets}} = this;
        let style = 'position:absolute; left:0; top:0; z-index:99;';
        if(positionElementOffsets){
            positionElement.style.cssText = style + `transform: translate(${positionElementOffsets.left}px, ${positionElementOffsets.top}px);`
        }else{
            positionElement.style.cssText = style + 'pointer-events:none; opacity: 0'
        }
    }

    scheduleUpdate = () => requestAnimationFrame(this.update);

    applyListen (fn) {
        this.eventEls.forEach((el) => {
            el[fn + 'EventListener']('scroll', this.update);
            // el[fn + 'EventListener']('resize', this.update);
        });
    }

    destory () {
        this.nodes.positionElement.removeAttribute('style');
        this.nodes.positionElement.removeAttribute('data-placement');

        this.applyListen('remove');
        this.opts.onDestory();
    }
}
