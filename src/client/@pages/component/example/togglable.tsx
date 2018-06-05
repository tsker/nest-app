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
                <Togglable isVisible={this.state.show}>
                    <div className='tst' style={{background:'#eee'}}>
                        <h2>asdfasdf</h2>
                        <h2>asdfasdf</h2>
                        <h2>asdfasdf</h2>
                        <h2>asdfasdf</h2>
                    </div>
                </Togglable>
            </section>
        );
    }
}
