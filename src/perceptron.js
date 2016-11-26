// @flow

const Firebase = require('firebase/lib/firebase-web');
const debug = console.log.bind(console, '[perceptron]');

function perceptron(name: string) {
  const ref = new Firebase('https://roshambo-6970c.firebaseio.com').child(name);

  type Perceptron = {
    w: Array<number>;
    b: number;
  };

  async function prediction(x: Array<number>): Promise<number> {
    debug(`Making prediction for ${JSON.stringify(x)}`);
    const {w, b} = await get();
    return activation(x, w, b);
  }

  async function update(x: Array<number>, activate: boolean): Promise<void> {
    const y = activate ? 1 : -1;
    debug(`Update x = ${JSON.stringify(x)}, y = ${y}`);
    const {w, b} = await get();
    const wf = w.map((wi: number, idx: number): number => {
      return wi + y * x[idx];
    });

    return await ref.update({w: wf, b: b + y});
  }

  async function get(): Promise<Perceptron> {
    const snapshot = await ref.once('value');
    return snapshot.val();
  }

  function activation(x: Array<number>, w: Array<number>, b: number): number {
    return b + x.reduce((sum: number, xi: number, idx: number): number => {
      return sum + w[idx] * xi;
    }, 0);
  }

  return {prediction, update};
}

module.exports = perceptron;
