import { createElement, Component } from 'react';
import { Modal, ModalProps } from './modal';
import { CreatePortal, noop } from '../util';

class ModalManager {
    portal = new CreatePortal();
    list = {};

    addModal (key, props: any) {
        this.list[key] = props;
        this.update();
    }
    removeModal (id) {
        delete this.list[id];
        this.update();
    }
    update () {
        let { list } = this;
        let modals = Object.keys(list).map((id) => <Modal key={id} {...list[id]} />);
        this.portal.render(modals);
    }
}

const manager = new ModalManager();

export function open ({ onOk = noop, onClose = noop, ...props }: ModalProps) {
    let key = Math.random();
    let config = {
        ...props,
        isVisible: true,
        isKeepDom: false,
        onOk () {
            onOk();
            manager.removeModal(key);
            return key;
        },
        onClose () {
            onClose();
            manager.removeModal(key);
        }
    };

    manager.addModal(key, config);

    return {
        id: key,
        close () {
            manager.removeModal(key);
        }
    };
}

export function confirm (title: string | object, children?, onOk?, onClose?) {
    let config = typeof title === 'string' ? { title, children, onOk, onClose } : title;

    return open({
        ...config,
        closeIcon: null,
        closeWithMask: false
    });
}

export function alert (title: string | object, children?, onOk?) {
    return confirm({
        title,
        children,
        onOk,
        closeText: null
    });
}

export function prompt (title: string | object, onOk = noop, onClose?) {
    let value = '';
    let modalPointer = confirm({
        title,
        children: <input onChange={(e) => (value = e.target.value)} />,
        onOk () {
            onOk(value);
        },
        onClose
    });

    return {
        ...modalPointer,
        getValue: () => value
    };
}
