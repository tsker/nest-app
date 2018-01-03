import * as React from 'react';
import { Tooltip, Button } from '@components';

export default class extends React.Component<any, any> {
    render() {
        return (
            <div>
                <h1>Tooltip</h1>
                <div>
                    {/* <div style={{ width: 100, height: 100, overflow: 'auto' }}> */}
                    <Tooltip
                        content="这是一个这是一个这是一个tooltip这是一个这是一个这是一个tooltip这是一个这是一个这是一个tooltip这是一个这是一个这是一个tooltip"
                        delay={10}
                    >
                        <Button>tooltip</Button>
                    </Tooltip>

                </div>
            </div>
        );
    }
}
