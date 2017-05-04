/**
 * Created by Grea on 5/4/17.
 */
import rp from 'request-promise';

const json = true;

const request = {
  get({uri, qs = null}) {
    return rp.get({uri, json, qs});
  },

  post({uri, form}) {
    return rp.post({uri, json, form});
  }
};

export default request;
