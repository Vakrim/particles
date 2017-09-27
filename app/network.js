import { createList, sum } from 'app/helpers';

const sigmoid = x => 1 / (1 + Math.pow(Math.E, -x));

const createNetwork = (inputs, layers, options = {}) => {
  options = {
    biasFn: () => Math.random() * 4 - 2,
    wageFn: () => Math.random() * 4 - 2,
    ...options,
  };
  const defnition = [];

  let previousLayerSize = inputs;
  const networkLayers = layers.map((layer, i) => {
    const biases = createList(layer.n, options.biasFn);
    const biasDefIndex = defnition.length;
    defnition.push(...biases);

    const wages = createList(layer.n * previousLayerSize, options.wageFn);
    const wagesDefIndex = defnition.length;
    defnition.push(...wages);

    previousLayerSize = layer.n;

    return {
      ...layer,
      biasDefIndex,
      wagesDefIndex,
    };
  });

  return {
    inputs,
    layers: networkLayers,
    defnition
  };
};

const calculate = (network, input) => {
  const defnition = network.defnition;
  return network.layers.reduce((values, layer, layerIndex) => {
    return defnition
      .slice(layer.biasDefIndex, layer.biasDefIndex + layer.n)
      .map((bias, perceptronIndex) => {
        const wagedValues = values.map(
          (v, vIndex) =>
            v *
            defnition[
              layer.wagesDefIndex + vIndex + perceptronIndex * values.length
            ]
        );
        return sigmoid(sum(bias, ...wagedValues));
      });
  }, input);
};

const network = createNetwork(4, [
  { n: 4, activation: sigmoid },
  { n: 8, activation: sigmoid },
]);

console.log(calculate(network, [0, 0, 0, 0]));
