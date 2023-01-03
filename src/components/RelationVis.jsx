import React, { Component } from "react";
import KitsuRelationNetwork from "./KitsuRelationNetwork";
import KitsuIDInput from "./KitsuIDInput";
import KitsuSimpleSearchBar from "./KitsuSimpleSearchBar";

class RelationVis extends Component {
    // constructor(props) {
    //     super(props);
    // }

    state = {
        kitsuID: 0,
    };

    kitsuIDInputHandler = (id) => {
        console.log(id);
        this.setState({ kitsuID: id });
    };

    render() {
        return (
            <React.Fragment>
                <div className="side-bar">
                    {/* <KitsuIDInput
                        inputHandler={this.kitsuIDInputHandler}
                        settleTime={300}
                    ></KitsuIDInput> */}
                    <KitsuSimpleSearchBar settleTime={300} resultHandler={this.kitsuIDInputHandler}></KitsuSimpleSearchBar>
                </div>
                <KitsuRelationNetwork
                    kitsuID={this.state.kitsuID}
                ></KitsuRelationNetwork>
            </React.Fragment>
        );
    }
}

export default RelationVis;
