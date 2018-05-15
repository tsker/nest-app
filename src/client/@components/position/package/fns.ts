export function findCommonParent(element1: Element, element2: Element) {
	if (!element2) {
		return document.documentElement;
	}

	let element1IsBeforeElement2 = element1.compareDocumentPosition(element2) === 4;
	if (element1IsBeforeElement2) {
		[ element1, element2 ] = [ element2, element1 ];
	}

	if (element1.contains(element2)) {
		return element1;
	}

	let range = document.createRange();
	range.setStart(element1, 0);
	range.setStart(element2, 0);
	return range.commonAncestorContainer as Element;
}

export function getOffsetParent(element): Element {
	if (!element) {
		return document.documentElement;
	}

	let { offsetParent } = element;
	let nodeName = offsetParent && offsetParent.nodeName;

	if (!nodeName || /HTML|BODY/.test(nodeName)) {
		return document.documentElement;
	}

	if (/TABLE|TD/.test(element.nodeName)) {
		return getOffsetParent(offsetParent);
	}

	return offsetParent;
}

export function getScrollParent(element): Element {
	if (!element || /HTML|BODY|#document/.test(element.nodeName)) {
		return document.documentElement;
	}

	const { overflow, overflowX, overflowY } = getComputedStyle(element) as any;
	if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
		return element;
	}

	return getScrollParent(element.parentNode);
}

export function includeScroll(rect, element, subtract = false) {
	let { scrollLeft, scrollTop } = element;
	const modifier = subtract ? -1 : 1;
	rect.top += scrollTop * modifier;
	rect.bottom += scrollTop * modifier;
	rect.left += scrollLeft * modifier;
	rect.right += scrollLeft * modifier;
	return rect;
}

export function getReferenceOffsetWithRelativeParent(
	parent: Element,
	child: Element,
	scrollParent: Element
): object {
	let childRect = child.getBoundingClientRect();
	let parentRect = parent.getBoundingClientRect();

	let top = childRect.top - parentRect.top;
	let left = childRect.left - parentRect.left;
	let offsets = {
		...childRect['toJSON'](),
		top,
		left,
		bottom: top + childRect.height,
		right: left + childRect.width,
		marginTop: 0,
		marginLeft: 0
	};

	if (parent !== document.documentElement && parent === scrollParent) {
		return includeScroll(offsets, parent);
	}

	return offsets;
}

export function getOppositePlacement(placement) {
	const hash = {
		left: 'right',
		right: 'left',
		bottom: 'top',
		top: 'bottom'
	};
	return placement.replace(/left|right|bottom|top/g, (matched) => hash[matched]);
}

export function flipPlacement(nodes, placement) {
	let { scrollParent, boundElement = scrollParent, reference, positionElement } = nodes;
	let [ basePlacement, suffixPlacement ] = placement.split('-');

	let boundRect = boundElement.getBoundingClientRect();
	let refRect = reference.getBoundingClientRect();



	let isHoriz = [ 'right', 'left' ].indexOf(basePlacement) !== -1;
	let measurement = isHoriz ? 'width' : 'height';
	let measurementNative = isHoriz ? 'clientWidth' : 'clientHeight';

	const rects = {
		top: {
			width: boundRect.width,
			height: refRect.top - boundRect.top
		},
		right: {
			width: boundRect.right - refRect.right,
			height: boundRect.height
		},
		bottom: {
			width: boundRect.width,
			height: boundRect.bottom - refRect.bottom
		},
		left: {
			width: refRect.left - boundRect.left,
			height: boundRect.height
		}
	};


	if (/HTML|BODY|#document/.test(boundElement.nodeName)) {
		rects.top.height = refRect.top
		rects.bottom.height = window.innerHeight - refRect.bottom
		rects.left.width = refRect.left
		rects.right.width = window.innerWidth - refRect.left
	}


	if (rects[basePlacement][measurement] > positionElement[measurementNative]) {
		return placement;
	}

	let computedPlacement = getOppositePlacement(basePlacement);
	suffixPlacement = suffixPlacement ? '-' + suffixPlacement : '';

	if (rects[computedPlacement][measurement] > positionElement[measurementNative]) {
		return computedPlacement + suffixPlacement;
	}

	return placement;
}

export function getOuterSizes(element) {
	const styles = getComputedStyle(element);
	const x = parseFloat(styles.marginTop!) + parseFloat(styles.marginBottom!);
	const y = parseFloat(styles.marginLeft!) + parseFloat(styles.marginRight!);
	const result = {
		width: element.offsetWidth + y,
		height: element.offsetHeight + x
	};
	return result;
}

export function getPositionElementOffsets(popper, referenceOffsets, placement): any {
	let [ basePlacement, suffixPlacement ] = placement.split('-');
	const popperRect = getOuterSizes(popper);
	const popperOffsets = {
		width: popperRect.width,
		height: popperRect.height
	};

	const isHoriz = [ 'right', 'left' ].indexOf(basePlacement) !== -1;
	const mainSide = isHoriz ? 'top' : 'left';
	const secondarySide = isHoriz ? 'left' : 'top';
	const measurement = isHoriz ? 'height' : 'width';
	const secondaryMeasurement = !isHoriz ? 'height' : 'width';

	popperOffsets[mainSide] =
		referenceOffsets[mainSide] +
		referenceOffsets[measurement] / 2 -
		popperRect[measurement] / 2;

	if (basePlacement === secondarySide) {
		popperOffsets[secondarySide] =
			referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
	} else {
		popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
	}

	if (suffixPlacement) {
		popperOffsets[mainSide] =
			suffixPlacement === 'start'
				? referenceOffsets[mainSide]
				: referenceOffsets[mainSide] +
					referenceOffsets[measurement] -
					popperRect[measurement];
	}

	return popperOffsets;
}
