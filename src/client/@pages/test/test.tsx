import * as React from 'react'

export default class  extends React.Component<any, any>{
    state={
        e:'adf'
    }

    click=()=>{ this.setState({e:Math.random()})}

    render(){
        return <h2 onClick={this.click}>{this.state.e}</h2>
    }
}