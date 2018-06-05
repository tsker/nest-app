import { createElement, Component } from 'react';
import { Sortable } from '@components';

function grenList () {
    return Array(6).fill('').map((_, index) => ({
        id: Math.random(),
        text: ''.padStart(10, index.toString())
    }));
}

export default class SortableExample extends Component<any, any> {
    state = {
        list: grenList()
    };
    render () {
        return (
            <section>
                <div className='sortable-wrap'>
                    <Sortable className='sortable'>
                        {this.state.list.map((content, index) => (
                            <li draggable key={content.id + index}>
                                2 -- {content.id} -- {content.text}
                            </li>
                        ))}
                    </Sortable>

                    <Sortable className='sortable2'>
                        {this.state.list.map((content, index) => (
                            <li draggable key={content.id + index}>
                                2 -- {content.id} -- {content.text}
                            </li>
                        ))}
                    </Sortable>
                </div>
            </section>
        );
    }
}
