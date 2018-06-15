import { createElement, Component } from 'react';
import { Form } from '@components';

function required (message) {
    return {
        rule: 'required',
        message: message + '必填'
    };
}

function length (len) {
    return {
        rule: new RegExp(`.{${len}}`),
        message: `长度最少 ${len}位`
    };
}

function Form1 () {
    function confirmPassword (repassword, { password }) {
        return password ? repassword === password.value : false;
    }
    return (
        <Form onSubmit={console.log}>
            <div>
                <Form.Item name='username' rules={[ required('username'), length(6) ]}>
                    <input type='text' />
                </Form.Item>
                <Form.Error name='username' />
            </div>

            <div>
                <Form.Item name='password' rules={[ required('password'), length(6) ]}>
                    <input type='text' />
                </Form.Item>
                <Form.Error name='password' />
            </div>
            <div>
                <Form.Item
                    name='repassword'
                    rules={[ { rule: confirmPassword, message: '请确认密码' } ]}
                >
                    <input type='text' />
                </Form.Item>
                <Form.Error name='repassword' />
            </div>

            <div>
                <Form.Item name='file' valuePropName='files'>
                    <input type='file' multiple />
                </Form.Item>
                <Form.Error name='file' />
                <span>test</span>
            </div>
            <div>
                <Form.Item name='test' valuePropName='checked'>
                    <input type='radio' />
                </Form.Item>
                <span>test</span>
            </div>

            <div>
                <Form.Item name='readme' valuePropName='checked' rules={[ required('readme') ]}>
                    <input type='checkbox' />
                </Form.Item>
                <span>readme</span>
                <Form.Error className='skin-error' name='readme' />
            </div>

            <button>submit</button>

            <hr />
            <Form.Context>
                {({ fields }) => <pre>{JSON.stringify(fields, null, 4)}</pre>}
            </Form.Context>
        </Form>
    );
}

class Form2 extends Component<any, any> {
    state = {
        v1: 'v1',
        v2: 'v2'
    };

    componentDidMount(){
        setTimeout(() => {
            this.refs.a['fireSubmit']()
        }, 3e3);
    }
    render () {
        return (
            <Form onSubmit={console.log} ref='a'>
                {this.state.v1}
                <Form.Item
                    name='v1'
                    value={this.state.v1}
                    onChange={(e) => this.setState({ v1: e.target.value })}
                    rules={[ { rule: /.{6}/, message: 'error length' } ]}
                >
                    <input />
                </Form.Item>
                <Form.Error name='v1' />
                <Form.Item
                    name='v2'
                    value={this.state.v2}
                    onChange={(e) => this.setState({ v2: e.target.value })}
                >
                    <input />
                </Form.Item>
                <button>submit</button>
                <hr />
                <Form.Context>
                    {({ fields }) => <pre>{JSON.stringify(fields, null, 4)}</pre>}
                </Form.Context>
            </Form>
        );
    }
}

export default class FormExample extends Component<any, any> {
    state = {
        views: [ Form1, Form2 ],
        view: 1
    };

    render () {
        let View = this.state.views[this.state.view];
        return (
            <section>
                <select
                    value={this.state.view}
                    onChange={(e) => this.setState({ view: +e.target.value })}
                >
                    <option value='0'>loing form</option>
                    <option value='1'>control form</option>
                </select>
                <View />
            </section>
        );
    }
}
