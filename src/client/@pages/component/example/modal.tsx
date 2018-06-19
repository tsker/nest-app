import { createElement, Component } from 'react';
import { Modal } from '@components';

export default class TogglableExample extends Component<any, any> {
    state = {
        show: false,
        show2: false
    };

    handleToggle = (e) => {
        this.setState({ show: !this.state.show });
    };

    handleClose = (e) => {
        this.setState({ show: false });
    };

    componentDidMount () {}

    render () {
        return (
            <section style={{ height: 2000 }}>
                <button
                    onClick={() =>
                        Modal.confirm(
                            '删除提醒',
                            '确认删除该项记录吗？',
                            () => Modal.alert('删除提醒', '删除成功！'),
                            () => Modal.alert('删除提醒', '已取消！')
                        )}
                >
                    confirm
                </button>
                <button
                    onClick={() => Modal.alert('alert', '??', () => console.log('alert callback'))}
                >
                    alert
                </button>
                <button
                    onClick={() => console.log(Modal.prompt('prompt'))}
                >
                    prompt
                </button>
                <hr />
                <div style={{ userSelect: 'none', cursor: 'pointer' }} onClick={this.handleToggle}>
                    open
                </div>
                <Modal
                    title='basic modal'
                    renderToPortal
                    isVisible={this.state.show}
                    onClose={this.handleClose}
                    onOk={this.handleClose}
                >
                    <div onClick={() => this.setState({ show2: true })}>open2</div>
                    <Modal
                        title='modal2'
                        renderToPortal
                        isVisible={this.state.show2}
                        footer={<button onClick={() => this.setState({ show2: false })}>确认</button>}
                        renderMask={false}
                        onClose={() => this.setState({ show2: false })}
                    >
                        <div>2222222222222222222222</div>
                        <div>2222222222222222222222</div>
                        <div>2222222222222222222222</div>
                        <div>2222222222222222222222</div>
                        <div>2222222222222222222222</div>
                    </Modal>
                    <div>11111111111111</div>
                    <div>11111111111111</div>
                    <div>11111111111111</div>
                    <div>11111111111111</div>
                    <div>11111111111111</div>
                    <div>11111111111111</div>
                </Modal>
            </section>
        );
    }
}
