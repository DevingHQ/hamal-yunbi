import assert from 'assert';
import HamalYunbi from '../lib';

const client = new HamalYunbi({
  key: '',
  secret: ''
});
client.setupMarket('cny', 'bts');

describe('hamal-yunbi', function () {
  it('must be true', function () {
    assert(true, 'passed');
  });
  it('/markets.json', function (done) {
    client.markets()
      .then(() => {
        done();
      }).catch(done);
  });
  it('/members/me.json', function (done) {
    client.accounts().then(() => {
      done();
    }).catch(done);
  });
  it('/tickers.json', function (done) {
    client.tickers().then(() => {
      done();
    }).catch(done);
  });
  it('/tickers/{pair}.json', function (done) {
    client.ticker().then(data => {
      done();
      console.log(data);
    }).catch(done);
  });
});
