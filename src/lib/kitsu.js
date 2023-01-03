import { eFetchJSON } from "./eFetchJSON";

class Kitsu {
    static async simpleSearch(query, limit = 5, sort = "-followersCount") {
        // const url = `https://kitsu.io/api/edge/anime?filter[text]=${query}&page[limit]=${limit}&sort=${sort}`;
        const url = `https://kitsu.io/api/edge/anime?filter[text]=${query}&page[limit]=${limit}`;
        let data = await eFetchJSON(url);
        return data;
    }
}

export default Kitsu;