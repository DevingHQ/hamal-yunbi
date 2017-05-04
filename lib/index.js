import request from './request';
import querystring from 'querystring';
import crypto from 'crypto';

const DOMAIN = 'https://yunbi.com';

export default class {
  /**
   * constructor
   * @param key
   * @param secret
   */
  constructor({key, secret, format = 'json', version = 'v2'}) {
    this.key = key;
    this.secret = secret;
    this.format = format;
    this.version = version;
  }

  setupMarket({currency, asset}) {
    this.market = asset.toLowerCase() + currency.toLowerCase();
  }

  // PUBLIC api
  markets() {
    const api = this._makeApi('markets');
    return this._get(api);
  }

  tickers() {
    const api = this._makeApi('tickers');
    return this._get(api);
  }

  ticker(market) {
    market = market || this.market;
    const api = this._makeApi(`tickers/${market}`);
    return this._get(api);
  }

  depth(market, limit) {
    market = market || this.market;
    const api = this._makeApi('depth');
    return this._get(api, {market, limit});
  }

  trades(market, {limit, timestamp, from, to, orderBy}) {
    const api = this._makeApi('trades');
    market = market || this.market;
    return this._get(api, {market, limit, timestamp, from, to, order_by: orderBy});
  }

  orderBook(market, {asksLimit, bidsLimit}) {
    market = market || this.market;
    const api = this._makeApi('order_book');
    return this._get(api, {market, asks_limit: asksLimit, bids_limit: bidsLimit});
  }

  crowdsales(key) {
    const api = this._makeApi(`crowdsales/${key}`);
    return this._get(api);
  }

  kData(market, tradeId, {limit, period, timestamp}) {
    const api = this._makeApi('k_with_pending_trades');
    return this._get(api, {market, trade_id: tradeId, limit, period, timestamp});
  }

  // PRIVATE api
  accounts() {
    const api = this._makeApi('members/me');
    return this._sget(api);
  }

  deposits({currency, limit, state}) {
    const api = this._makeApi('deposits');
    return this._sget(api, {currency, limit, state});
  }

  depositAddress(currency) {
    const api = this._makeApi('deposit_address');
    return this._sget(api, {currency});
  }

  myTrades(market, {limit, timestamp, from, to, orderBy}) {
    const api = this._makeApi('trades/my');
    return this._sget(api, {market, limit, timestamp, from, to, order_by: orderBy});
  }

  order(id) {
    const api = this._makeApi('order');
    return this._sget(api, {id});
  }

  deleteOrder(id) {
    const api = this._makeApi('order/delete');
    return this._post(api, {id});
  }

  withdraw(id, amount, memo) {
    const api = this._makeApi('withdraw');
    return this._post(api, {id, amount, memo});
  }

  // Utils
  _makeApi(name) {
    return `/api/${this.version}/${name}.json`;
  }

  _makeQuery(verb, api, params = {}) {
    const query = {};
    params.tonce = new Date().getTime();
    params.access_key = this.key;
    /* eslint-disable */
    Object.keys(params).sort().map(key => {
      query[key] = params[key];
    });
    /* eslint-enable */
    const queryString = querystring.stringify(query);
    const payload = `${verb.toUpperCase()}|${api}|${queryString}`;
    query.signature = crypto.createHmac('sha256', this.secret).update(payload).digest('hex');
    return query;
  }

  _get(api, qs) {
    return request.get({uri: DOMAIN + api, qs});
  }

  _sget(api, params) {
    const query = this._makeQuery('get', api, params);
    return this._get(api, query);
  }

  _post(api, params) {
    const qs = this._makeQuery('get', api, params);
    return request.post({uri: DOMAIN + api, qs});
  }
}
