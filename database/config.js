var config = {};
config.tables = [];

config.tables.push({
  name: 'bears',
  columns : ['name']
});

config.tables.push({
  name: 'users',
  columns : ['name','taxrate']
});

module.exports = config;
