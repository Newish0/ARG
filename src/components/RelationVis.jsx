import React, { Component } from "react";
import RelationNetwork from "./RelationNetwork";
import KitsuSimpleSearchBar from "./KitsuSimpleSearchBar";
import DetailPanel from "./DetailPanel";
import Kitsu from "../lib/kitsu";

/* 
Should move to TS? 

type KitsuType = "anime" | "manga";

interface KitsuData {
    id: number | string;
    type: KitsuType;
    [key: string]: any;
}
*/

class RelationVis extends Component {
    // constructor(props) {
    //     super(props);
    // }

    state = {
        kitsuData: null,
        detailPanelData: null,
    };

    // Param: KitsuData
    dataChangeHandler = (kitsuData) => {
        // Note: detailPanelData need copy of kitsuData as it will be independent of state.kitsuData late
        this.setState({
            kitsuData,
            detailPanelData: { ...kitsuData },
        });
    };

    nodeSelectHandler = (params) => {
        const selectedNodeID = params.nodes[0];
        const type = selectedNodeID.split("-")[0];
        const id = selectedNodeID.split("-")[1];

        Kitsu.getByTypeID(type, id).then((data) => {
            // this.setState({ detailPanelData: data.data });

            this.detailPanelSetter(data.data);
        });
    };

    render = () => {
        const { kitsuData, detailPanelData } = this.state;

        return (
            <React.Fragment>
                <div className="side-bar">
                    <KitsuSimpleSearchBar
                        settleTime={300}
                        onResult={this.dataChangeHandler}
                    ></KitsuSimpleSearchBar>
                    <DetailPanel mediaData={detailPanelData} onMount={ (setter)=> {
                        this.detailPanelSetter = setter;
                    }}></DetailPanel>
                </div>
                <RelationNetwork
                    kitsuID={kitsuData ? kitsuData.id : 0}
                    kitsuType={kitsuData ? kitsuData.type : ""}
                    onSelectNode={this.nodeSelectHandler}
                ></RelationNetwork>
            </React.Fragment>
        );
    };
}

export default RelationVis;
