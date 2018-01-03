import * as React from 'react';
import { Input, Button, Select, Checkbox, Popover } from '@components';
import { Modal } from '@components/modal';
let img = require('@static/img/img.jpg');

export default class extends React.Component<any, any> {
    render() {
        let imgShow = <img src={img} style={{ width: 160 }} />;
        return (
            <div>
                <h1>Popover</h1>
                <div>
                    {/* <div style={{ width: 100, height: 100, overflow: 'auto' }}> */}
                    <Popover content="asdfasdf">
                        <Button>asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf</Button>
                    </Popover>
                    <Popover content={imgShow}>
                        <Button>img</Button>
                    </Popover>
                </div>
            </div>
        );
    }
}
