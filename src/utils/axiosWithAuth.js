import axios from "axios";

export default token => {
    return axios.create( {
        headers: {
            "Content-Type": "application/json",
            Authorization:  `${ token }`
        }
    } );
};
