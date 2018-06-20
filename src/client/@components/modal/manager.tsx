import { createElement } from 'react';
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
    let id = Math.random();

    function ok () {
        onOk();
        manager.removeModal(id);
    }
    function close () {
        onClose();
        manager.removeModal(id);
    }

    let config = {
        ...props,
        isVisible: true,
        isKeepDom: false,
        onOk: ok,
        onClose: close
    };

    manager.addModal(id, config);

    return { id, close, ok };
}

export function confirm (title: string | ModalProps, children?, onOk?, onClose?) {
    let config = typeof title === 'string' ? { title, children, onOk, onClose } : title;

    return open({
        ...config,
        closeIcon: null,
        closeWithMask: false
    });
}

export function alert (title: string | ModalProps, children?, onOk?) {
    return confirm({
        title,
        children,
        onOk,
        closeText: null
    });
}

interface PromptPromise<T> extends Promise<T> {
    id: any;
    ok: any;
    close: any;
}

export function prompt (
    title: string | ModalProps,
    onOk = noop,
    onClose = noop
): PromptPromise<string> {
    let value = '';
    let __resolve, __reject;

    let modal = confirm({
        title,
        onClose: () => {
            onClose();
            __reject('prompt cancel');
        },
        onOk: () => {
            onOk(value);
            __resolve(value);
        },
        children: (
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    modal.ok();
                }}
            >
                <input type='text' onChange={(e) => (value = e.target.value)} />
            </form>
        )
    });

    let promise: any = new Promise(function (resolve, reject) {
        __resolve = resolve;
        __reject = reject;
    });

    Object.assign(promise, modal);

    return promise;
}
