// @flow

const React = require('react');
const {colors} = require('./uuid');

function colorUuid(uuid: string): React.Element<any> {
  const color = colors.find((aColor: string): boolean => {
    return uuid.includes(aColor);
  });

  return <div style={{color: color}}>{uuid}</div>;
}

module.exports = colorUuid;
