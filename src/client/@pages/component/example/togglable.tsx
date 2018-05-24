import { createElement, Component } from 'react';
import { Togglable, Transition } from '@components';

export default class TogglableExample extends Component<any, any> {
    state = {
        show: false
    };

    render () {
        return (
            <section>
                <div
                    style={{ userSelect: 'none', cursor: 'pointer' }}
                    onClick={() => this.setState({ show: !this.state.show })}
                >
                    toggle
                </div>
                <Togglable isVisible={this.state.show} animation='fadeInDown'>
                    <h2>asdfasdf</h2>
                    <h2>asdfasdf</h2>
                </Togglable>
            </section>
        );
    }
}
