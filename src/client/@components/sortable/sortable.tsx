import { createElement, Component, HtmlHTMLAttributes, createRef } from 'react';
import * as cls from 'classnames';

import { bindAll, noop } from '../util';

interface SortableProps extends HtmlHTMLAttributes<HTMLDivElement> {
    Wrapper?: string;
    onDone?: any;
}
interface SortableState {}

export class Sortable extends Component<SortableProps, SortableState> {
    public static defaultProps: Partial<SortableProps> = {
        onDone: noop
    };

    private rootEl: React.RefObject<HTMLDivElement> = createRef();
    constructor (p) {
        super(p);
        bindAll(this, 'handleDragStart', 'handleDragEnter', 'handleDragEnd');
    }

    private startIndex: number = -1;
    private endIndex: number = -1;
    handleDragStart ({ target }) {
        this.startIndex = this.endIndex = this.getChildren().findIndex(
            (el) => el === target || el.contains(target)
        );

        target.classList.add('sortable-active');
    }
    handleDragEnter ({ target }) {
        if (this.startIndex === -1) {
            return;
        }

        let children = this.getChildren();
        let { endIndex } = this;
        let dragEnterIndex = children.findIndex((item) => item === target || item.contains(target));

        if (endIndex === dragEnterIndex || target === this.rootEl.current) {
            return;
        }

        let itemBeforeEnter = endIndex < dragEnterIndex;
        let insertEl = itemBeforeEnter
            ? children[dragEnterIndex].nextElementSibling
            : children[dragEnterIndex];

        this.rootEl.current!.insertBefore(children[endIndex], insertEl);
        this.endIndex = dragEnterIndex;
    }
    handleDragEnd () {
        if (this.startIndex === -1) {
            return;
        }
        let { startIndex, endIndex } = this;
        this.getChildren()[endIndex].classList.remove('sortable-active');

        if (startIndex !== endIndex) {
            this.props.onDone(startIndex, endIndex);
        }

        this.startIndex = -1;
    }

    getChildren () {
        return [ ...this.rootEl.current!.children ];
    }

    render () {
        let { Wrapper = 'ul', onDone, ...props } = this.props;

        return (
            <Wrapper
                {...props}
                ref={this.rootEl}
                onDragStart={this.handleDragStart}
                onDragEnter={this.handleDragEnter}
                onDragEnd={this.handleDragEnd}
            />
        );
    }
}
