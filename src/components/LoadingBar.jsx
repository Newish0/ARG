import React, { Component } from "react";

class LoadingBar extends Component {
    state = {};
    render() {
        const { children, percentProgress, hidden } = this.props;
        return (
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    width: "-webkit-fill-available",
                    display: hidden ? "none" : "flex",
                    height: "-webkit-fill-available",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    boxSizing: "border-box",
                    gap: "12px",
                    backdropFilter: "blur(16px)"
                }}
            >
                <div>{children}</div>
                <div
                    style={{
                        width: "calc(100% - 64px)",
                        border: "2px solid #333",
                        boxSizing: "border-box",
                        position: "relative",
                        borderRadius: "12px",
                    }}
                >
                    <div
                        style={{
                            textAlign: "center",
                            marginBlock: "10px",
                            zIndex: 2,
                        }}
                    >
                        {percentProgress ? percentProgress.toFixed(1) : 0}%
                    </div>
                    <div
                        style={{
                            background: "#999",
                            height: "100%",
                            width: `calc(100% * ${percentProgress / 100})`,
                            position: "absolute",
                            top: 0,
                            left: 0,
                            borderRadius: "12px",
                            zIndex: -1,
                        }}
                    ></div>
                </div>
            </div>
        );
    }
}

export default LoadingBar;
