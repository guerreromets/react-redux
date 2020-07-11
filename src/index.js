import React from "react";
import ReactDom from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

class App extends React.Component {

    constructor(props) {
        //Must call super()
        super(props);

        this.state = { lat: null, errorMessage: ''}; //initialization of latitude in object state

        //Never do a direct assignment to the state object.
        // **EXCEPT: When we initialize state in constructor function**

    }

    state = {lat: null, errorMessage: ''};

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            (position) => this.setState({lat: position.coords.latitude}),
            (err) => this.setState({errorMessage: err.message})
        );
    }

    renderContent() {
        if(this.state.errorMessage && !this.state.lat){
            return <div>Error: {this.state.errorMessage}</div>;
        }

        if(!this.state.errorMessage && this.state.lat){
            return <SeasonDisplay lat={this.state.lat}/>;
        }

        return <Spinner message="Please accept location request"/>;
    }


    render() { //Render method will be called frequently avoid doing processing or logic

       return <div>{this.renderContent()}</div>;
    }
}

ReactDom.render(
    <App />,
    document.querySelector('#root')
)