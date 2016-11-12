
function createData() {
  return {
    index: 0,
    id: '2e668cbe-d709-46c1-b97c-0b09a5f42fbb',
    isActive: true,
    balance: '$1,325.18',
    name: 'Olsen Lindsey',
    gender: 'male',
    registered: new Date('2014-08-28 02:37:37'),
    location: {
      latitude: 86.085866,
      longitude: -137.520349,
    },
    tags: [
      'deserunt',
      'ea',
      'amet',
      'consectetur',
      'duis',
      'exercitation',
      'velit',
    ],
    friends: new Map([
      [0, 'Wheeler Riley'],
      [1, 'Mcmahon Tyson'],
      [2, 'Long Wilkerson'],
    ]),
    requestSomething: new Promise(resolve => resolve(true)),
    colors: new Set(['red', 'green', 'blue']),
    regexp: /test/,
  };
}

export default createData;
