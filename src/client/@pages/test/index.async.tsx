import * as React from 'react'

export default class TestPage extends React.Component<any, any>{
    render(){
        return <div>
            <h1 draggable onDragStart={console.log}>test page!!</h1>
        </div>
    }
}