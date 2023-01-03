import React from "react";
import { Network } from "vis-network";
import { DataSet } from "vis-data";
import KitsuRelation from "../lib/kitsuRelation";

class KitsuRelationNetwork extends React.Component {
    state = {
        maxDepth: 12,
    };

    // kebab & snake case to title case
    // Source: https://stackoverflow.com/a/64489760
    titleCase = (s) =>
        s
            .replace(/^[-_]*(.)/, (_, c) => c.toUpperCase()) // Initial char (after -/_)
            .replace(/[-_]+(.)/g, (_, c) => " " + c.toUpperCase()); // First char after each -/_

    updateVisNetwork = async (container, id) => {
        const relRoleColorMap = {
            prequel: "hsl(0, 50%, 70%)",
            summery: "hsl(23, 50%, 70%)",
            side_story: "hsl(46, 50%, 70%)",
            spinoff: "hsl(69, 50%, 70%)",
            sequel: "hsl(92, 50%, 70%)",
            alternative_setting: "hsl(115, 50%, 70%)",
            adaptation: "hsl(138, 50%, 70%)",
            parent_story: "hsl(161, 50%, 70%)",
            alternative_version: "hsl(184, 50%, 70%)",
            full_story: "hsl(207, 50%, 70%)",
            other: "hsl(230, 50%, 70%)",
        };

        // const rawRelations = await KitsuRelation.get(5287, 5);
        const rawRelations = await KitsuRelation.get(id, this.state.maxDepth);
        console.log("kitsu relation", rawRelations);

        let desRelObj = KitsuRelation.parseRelations(rawRelations);
        console.log(desRelObj);

        let { relations, destinations } = desRelObj;

        let edgeInfoList = relations.map((rel) => {
            const desData = rel.relationships.destination.data;
            const srcData = rel.relationships.source.data;
            return {
                from: `${desData.type}-${desData.id}`,
                to: `${srcData.type}-${srcData.id}`,
                label: this.titleCase(rel.attributes.role),
                color: relRoleColorMap[rel.attributes.role],
                level: rel.depth,
                id: `${rel.type}-${rel.id}`,
                kitsuRelMeta: {
                    role: rel.attributes.role,
                    id: rel.id,
                    type: rel.type,
                },
                // group: rel.depth
            };
        });

        for (let i = edgeInfoList.length - 1; i >= 0; i--) {
            const a = edgeInfoList[i];
            for (let j = edgeInfoList.length - 1; j >= 0; j--) {
                const b = edgeInfoList[j];
                if (
                    a.to === b.from &&
                    a.from === b.to &&
                    a.kitsuRelMeta.role === b.kitsuRelMeta.role
                ) {
                    edgeInfoList.splice(j, 1);
                    a.arrows = {
                        to: {
                            enabled: true,
                            type: "arrow",
                        },
                        from: {
                            enabled: true,
                            type: "arrow",
                        },
                    };
                }
            }
        }

        console.log("Edge list info:", edgeInfoList);

        let nodeInfoList = destinations.map((des) => {
            return {
                id: `${des.type}-${des.id}`,
                label: des.attributes.canonicalTitle,
                shape: "circularImage",
                image: des.attributes.posterImage.small,
                color: des.type === "anime" ? "#00fffb": "#ff00d4",
                borderWidth: des.id === id ? 12 : 4,
            };
        });

        console.log("Node list info:", nodeInfoList);

        // create an array with nodes
        // let nodes = new vis.DataSet([
        //     { id: 1, label: "Node 1" },
        //     { id: 2, label: "Node 2" },
        //     { id: 3, label: "Node 3" },
        //     { id: 4, label: "Node 4" },
        //     { id: 5, label: "Node 5" },
        // ]);
        let nodes = new DataSet(nodeInfoList);
        let edges = new DataSet(edgeInfoList);

        // // create an array with edges
        // let edges = new vis.DataSet([
        //     { from: 1, to: 3, label: "1 to 3" },
        //     { from: 1, to: 2 },
        //     { from: 2, to: 4 },
        //     { from: 2, to: 5 },
        //     { from: 3, to: 3 },
        // ]);

        // create a graph
        let data = {
            nodes,
            edges,
        };

        let options = {
            edges: {
                length: 500,
                arrows: {
                    to: {
                        enabled: true,
                        type: "arrow",
                    },
                },
                font: {
                    align: "middle",
                },
            },
            nodes: {
                shape: "dot",
                size: 32,
            },
            physics: {
                forceAtlas2Based: {
                    gravitationalConstant: -30,
                    centralGravity: 0.001,
                    springLength: 250,
                    springConstant: 0.1,
                },
                maxVelocity: 100,
                solver: "forceAtlas2Based",
                timestep: 0.1,
                stabilization: { iterations: 1000 },
            },
            layout: {
                randomSeed: 0,
                // hierarchical: {
                //     direction: "LR",
                //     sortMethod: "hubsize",
                //     nodeSpacing: 500,
                // }
            },
        };

        let network = new Network(container, data, options);

        network.on("click", (params) => {
            console.log(params);
        });
    };

    componentDidUpdate = () => {
        // create a network
        var container = document.getElementById("relVisNetwork");

        // container.textContent = this.props.kitsuID;

        this.updateVisNetwork(container, this.props.kitsuID);
    };

    render = () => {
        return <div id="relVisNetwork"></div>;
    };
}

export default KitsuRelationNetwork;
