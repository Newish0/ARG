import React, { Component } from "react";
import Kitsu from "../lib/kitsu";

class DetailPanel extends Component {
    state = {
        mediaData: this.props.mediaData,
    };

    getDateRange(startDate, endDate, tba, status) {
        if (tba) {
            return (
                <React.Fragment>
                    <time>{status}</time> <p>({status})</p>
                </React.Fragment>
            );
        } else if (startDate && !endDate) {
            return (
                <React.Fragment>
                    <time>{startDate}</time> to ? <p>({status})</p>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <time>{startDate}</time> to <time>{endDate}</time>
                </React.Fragment>
            );
        }
    }

    componentDidMount = () => {
        this.props.onMount(this.setMediaData);
    }

    setMediaData = (mediaData) => {
        this.setState({ mediaData });
    };

    render() {
        const { mediaData } = this.state;

        if (!mediaData) return <div></div>;

        const { type } = mediaData;

        const {
            canonicalTitle,
            posterImage,
            startDate,
            endDate,
            status,
            tba,
            synopsis,
            slug,
        } = mediaData.attributes;

        return (
            <div className="col center scroll">
                <img
                    src={posterImage.medium}
                    alt={`Poster of ${canonicalTitle}`}
                />
                <a href={`https://kitsu.io/${type}/${slug}`} target="_blank">
                    <h1>{canonicalTitle}</h1>
                </a>
                <div>{this.getDateRange(startDate, endDate, tba, status)}</div>
                <div>
                    <p>{synopsis}</p>
                </div>
            </div>
        );
    }
}

export default DetailPanel;
