import { createPortal, render } from 'react-dom';

export class CreatePortal {
    rootEl: HTMLDivElement;
    isMount: boolean = false;
    constructor (private parent = document.body) {
        this.rootEl = document.createElement('div');
    }

    destory () {
        if (this.isMount) {
            this.parent.removeChild(this.rootEl);
        }
    }

    mount () {
        if (this.isMount) {
            return;
        }

        this.isMount = true;
        this.parent.appendChild(this.rootEl);
    }

    renderPortal (component: React.ReactNode) {
        this.mount();
        return createPortal(component, this.rootEl);
    }

    render (component) {
        this.mount();
        return render(component, this.rootEl);
    }
}
