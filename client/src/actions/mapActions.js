import axios from 'axios';

export const getMap = () => {
    return axios
        .get('/api/maps')
        .then(res => {
            console.log(res.mapURL);
            return res.data.mapURL
        })
        .catch(err =>
            console.log(err)
        );
};

export const getGeoCodeKey = () => {
    return axios
        .get('/api/maps')
        .then(res => {
            console.log(res.geoCodeKey);
            return res.data.geoCodeKey
        })
        .catch(err =>
            console.log(err)
        );
};