const GiphyClient = require('../../services/giphy_client.js');
let giphy_client = new GiphyClient;

const nock = require('nock');

describe('GiphyClient', () => {
  describe('randomGif', () => {
    describe('when giphy API is successful', () => {
      beforeEach(() => {
        nock('https://api.giphy.com')
          .get('/v1/gifs/random')
          .query(true)
          .reply(200, {
            data: {
              images: {
                fixed_height: {
                  url: 'http://giphy.com/some-gif.gif'
                }
              }
            }
          });
      });

      it('returns a url', () => {
        return giphy_client.randomGif().then(data => {
          expect(data).toBe('http://giphy.com/some-gif.gif');
        });
      });
    });

    describe('when giphy API is unsuccessful', () => {
      beforeEach(() => {
        nock('https://api.giphy.com')
          .get('/v1/gifs/random')
          .query(true)
          .replyWithError('something awful happened');
      });

      it('returns an empty string', () => {
        return giphy_client.randomGif().then(data => {
          expect(data).toBe('');
        });
      });
    });
  });
});
