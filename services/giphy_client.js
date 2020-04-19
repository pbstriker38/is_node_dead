const got = require('got');

module.exports = class GiphyClient {
  randomGif({ tag = '', rating = 'PG-13' } = {}) {
    let searchParams = new URLSearchParams(
      [
        ['api_key', process.env.GIPHY_API_KEY],
        ['tag', tag],
        ['rating', rating]
      ]
    );

    return got('https://api.giphy.com/v1/gifs/random', {searchParams}).json().then(response => {
      return response.data.images.fixed_height.url;
    }).catch(error => {
      console.error(error);
      return '';
    });
  }
}
