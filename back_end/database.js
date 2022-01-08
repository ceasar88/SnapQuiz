const Promise = require('bluebird');
const redis = Promise.promisifyAll(require('redis'));

module.exports = redis.createClient({
  host: 'li340-184.members.linode.com',
  password: 'Snapquiz'
})
