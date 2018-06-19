import { createElement, Component } from 'react';
import { Badge } from '@components';

export default class BadgeExample extends Component<any, any> {
    render () {
        return (
            <section>
                <div style={{ padding: 20 }}>
                    <Badge>1</Badge>
                    <br />
                    <br />
                    <Badge skin='red'>2 message</Badge>
                    <br />
                    <br />
                    <Badge skin='red'>好c中</Badge>
                    <br />
                    <br />
                    <Badge skin='green'>99+</Badge>
                    <br />
                    <br />
                    <div style={{ background: '#eee', lineHeight: '40px' }}>
                        <Badge dot skin='yellow' />
                        <Badge dot skin='orange' />
                        <Badge dot skin='purple' />
                        <Badge dot skin='red' />
                        <Badge dot skin='green' />
                        <Badge dot />
                    </div>
                </div>
            </section>
        );
    }
}
