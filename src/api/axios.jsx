import axios from "axios";
import { Config } from "/config";

// export default axios.create({
//     baseURL: "http://localhost:3000/api"
// });

export default axios.create({
    baseURL: Config.serverUrl
});