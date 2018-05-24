import { queue, noop } from './';

interface TimeQueueOpts {
    tasks: any[];
    times?: number[];
    onDone?: any;
}

export class TimeQueue {
    constructor (private opts: TimeQueueOpts) {
        opts.tasks = opts.tasks.map(this.initTask.bind(this));
    }

    private timer: any;
    private initTask (task, index) {
        let { times = [] } = this.opts;

        if (task.length >= 2) return task;

        return (arg, next) => {
            task(arg);
            this.timer = setTimeout(next, times[index], arg);
        };
    }

    cancel () {
        clearTimeout(this.timer);
    }

    start (params?) {
        this.cancel();

        let { onDone = noop } = this.opts;
        queue(...this.opts.tasks, onDone)(params);
    }
}
