import * as React from "react";
import {render} from 'react-dom'


class App extends React.Component{
    render(){
        return <h1>react app</h1>
    }
}

render(<App/>, document.getElementById('main'))