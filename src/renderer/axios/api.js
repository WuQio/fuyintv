import service from './requests';

export const getMovieInfo = function (movieId) {
  return service({
    url: `https://data-api.sanmanuela.net/api/movie/index?app=fuyinTV&device=ios&movid=${movieId}&version=2.4.3`,
    method: "GET"
  })
}

const { net } = require('electron').remote

export function getM3u8(movid, urlid, callback) {
  const request = net.request(`http://data-api.sanmanuela.net/api/url/index?app=fuyinTV&device=ios&movid=${movid}&urlid=${urlid}&version=2.4.3`)
  request.on('response',(response) => {
    response.on('data', (data)=>{
      callback(JSON.parse(data))
    })
  });
  request.end();
}
