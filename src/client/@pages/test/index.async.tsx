import * as React from 'react'
import Test from './test'

export default class TestPage extends React.Component<any, any>{
    render(){
        return <div>
            <h1>test page!!</h1>
            <Test/>
        </div>
    }
}