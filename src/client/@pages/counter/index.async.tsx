import * as React from 'react'
import { connect } from "react-redux";
import { actions } from "@store/modules/counter";

class CounterPage extends React.Component<any, any>{
    render(){
        console.log(this.props)
        return <h1>test page!!!!!</h1>
    }
}

function mapStateToProps(){}

export default connect((state) => state,actions)(CounterPage)