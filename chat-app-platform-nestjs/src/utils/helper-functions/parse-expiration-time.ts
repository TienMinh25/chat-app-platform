export function parseExpirationTime(expiration: string): number {
  const timeUnits: { [key: string]: number } = {
    y: 31557600000,
    mo: 30 * 86400000,
    w: 604800000,
    d: 86400000,
    h: 3600000,
    m: 60000,
    s: 1000,
    ms: 1,
  };

  const unit = expiration.match(/[a-zA-Z]+/)[0];
  const value = parseInt(expiration.match(/\d+/)[0]);

  if (!timeUnits[unit]) {
    throw new Error('Invalid expiration time format');
  }

  return value * timeUnits[unit];
}
