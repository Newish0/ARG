import React from "react";
import { Network } from "vis-network";
import { DataSet } from "vis-data";
import KitsuRelation from "../lib/kitsuRelation";
import brokenImage from "../imgs/broken-image-small.png";

class RelationNetwork extends React.PureComponent {
    state = {
        maxDepth: 12,
    };

    // kebab & snake case to title case
    // Source: https://stackoverflow.com/a/64489760
    titleCase = (s) =>
        s
            .replace(/^[-_]*(.)/, (_, c) => c.toUpperCase()) // Initial char (after -/_)
            .replace(/[-_]+(.)/g, (_, c) => " " + c.toUpperCase()); // First char after each -/_

    updateVisNetwork = async (container, id, type) => {
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
        const rawRelations = await KitsuRelation.get(
            id,
            type,
            this.state.maxDepth
        );
        console.log("kitsu relation", rawRelations);

        let { relations, destinations } =
            KitsuRelation.parseRelations(rawRelations);

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

        // Simplify graph
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
                color: des.type === "anime" ? "#00fffb" : "#ff00d4",
                borderWidth: des.id === id ? 12 : 4,
            };
        });

        console.log("Node list info:", nodeInfoList);

        let nodes = new DataSet(nodeInfoList);
        let edges = new DataSet(edgeInfoList);

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
                brokenImage,
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
            },
        };

        let network = new Network(container, data, options);

        // network.on("click", (params) => {
        //     console.log(params);
        // });

        network.on("selectNode", (params) => {
            this.props.onSelectNode(params);
        });

        // TODO
        if (nodeInfoList.length < 1) {
            console.log("RelationNetwork: No INFO! (TODO)");
        }
    };

    componentDidUpdate = () => {
        // create a network
        const container = document.getElementById("relVisNetwork");
        const { kitsuID, kitsuType } = this.props;

        this.updateVisNetwork(container, kitsuID, kitsuType);
    };

    render = () => {
        return <div id="relVisNetwork"></div>;
    };
}

export default RelationNetwork;
