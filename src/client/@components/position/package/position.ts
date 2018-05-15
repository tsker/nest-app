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
	offset?:number

	onCreate?: any;
	onUpdate?: any;
	onDestory?: any;
}

export class PositionNativeJS {
	public static defaultOpts: PositionNativeJSOpts = {
		placement: 'bottom',
		flip: true,
		offset:0,
		onCreate: noop,
		onUpdate: noop,
		onDestory: noop
	};

	private created: boolean = false;
	private opts: PositionNativeJSOpts;
	private nodes: {
		reference: Element;
		positionElement: HTMLElement;
		commonParent: Element;
		commonOffsetParent: Element;
		scrollParent: Element;
	};
	private placement: Placement = 'bottom';

	private reference: Element;
	private eventEls: (Window | Element)[];
	private positionElement: HTMLElement;
	private referenceOffsets: object = {};
	private positionElementOffsets: object = {};

	constructor(reference: Element, positionElement: HTMLElement, opts?: PositionNativeJSOpts) {
		this.reference = reference;
		this.positionElement = positionElement;
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

		this.applyStyle('pointer-events:none; opacity: 0');
		this.update();
	}

	update() {
		let { opts, nodes } = this;
		let { commonOffsetParent, reference, scrollParent } = nodes;
		this.referenceOffsets = getReferenceOffsetWithRelativeParent(
			commonOffsetParent,
			reference,
			scrollParent
		);

		this.placement = opts.flip ? flipPlacement(nodes, opts.placement) : opts.placement;
		let targetOffsets = getPositionElementOffsets(
			this.positionElement,
			this.referenceOffsets,
			this.placement
		);

		this.positionElementOffsets = targetOffsets;

		let positionCss = `transform: translate(${targetOffsets.left}px, ${targetOffsets.top}px);`;
		this.applyStyle(positionCss);

		if (this.created) {
			opts.onUpdate(positionCss);
		} else {
			this.created = true;
			opts.onCreate(positionCss);
		}
	}

	mergeStyle(style) {
		return 'position:absolute; left:0; top:0; z-index:99;' + style;
	}

	applyStyle(style) {
		this.positionElement.setAttribute('style', this.mergeStyle(style));
	}

	scheduleUpdate = () => requestAnimationFrame(this.update);

	applyListen(fn) {
		this.eventEls.forEach((el) => {
			el[fn + 'EventListener']('scroll', this.update);
			el[fn + 'EventListener']('resize', this.update);
		});
	}

	destory() {
		this.applyListen('remove');
		this.positionElement.removeAttribute('style');
		this.opts.onDestory();
	}
}
