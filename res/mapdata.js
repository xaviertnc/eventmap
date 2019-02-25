let mapdata = {
  id: 1,
  name: 'KragDag Ekspo',
  layers: {
    base: { name: 'Base', items: [], z: 1 }
  },
  groups: [
    { id: 1, name: 'unplaced', items: [], parent: {} },
    { id: 2, name: 'placed'  , items: [], parent: {} }
  ],
  itemtypes: {
    Junior4x4:      { pivotx: 0, pivoty : 0, scale: 0.5, spr: 'red' },
    Kos4x4:         { pivotx: 0, pivoty : 0, scale: 0.5, spr: 'lightblue' },
    Snuffel4x4:     { pivotx: 0, pivoty : 0, scale: 0.5, spr: 'green' },
    Opvoedkunde4x4: { pivotx: 0, pivoty : 0, scale: 0.5, spr: 'peach' },
    Tema4x4:        { pivotx: 0, pivoty : 0, scale: 0.5, spr: 'yellow' },
    Maker4x4:       { pivotx: 0, pivoty : 0, scale: 0.5, spr: 'purple' },
    Vermaak4x4:     { pivotx: 0, pivoty : 0, scale: 0.5, spr: 'olive' },
    Raadsaal:       { pivotx: 0, pivoty : 0, scale: 1.0, spr: 'blue' },
    Borge4x4:       { pivotx: 0, pivoty : 0, scale: 0.5, spr: 'grey'}
  },
  items: [
    {
      id: 1, type: 'Junior4x4', x: 100, y: 100, z: 0, angle: 0, layer: 'base',  group: 2,
      data: {
        stalnommer: '123',
        straatnaam: 'Suid-Oos',
        uitstalling: {
          id: 45,
          logo: 'img/logo.png',
          uitstalling: 'Jannie se Goetters',
          uitstaller: 'Jannie en Kie',
          kontak: 'Jannie Koekemoer',
          epos: 'jannie@jnk.com',
          tel: '(012) 333 6670',
          sel: '(082) 695 1235',
          posadres: 'P.O. Box 1198, Jannieville, 0120',
          straatadres: '112 JannnieSeStraat, Jannieville, 0070',
          gps: ''
        }
      }
    },
    { id: 2 , type: 'Junior4x4'      , x: 0, y: 0, z: 0, angle: 0, layer: 'base',  group: 1, data: {} },
    { id: 3 , type: 'Junior4x4'      , x: 0, y: 0, z: 0, angle: 0, layer: 'base',  group: 1, data: {} },
    { id: 4 , type: 'Kos4x4'         , x: 0, y: 0, z: 0, angle: 0, layer: 'base',  group: 1, data: {} },
    { id: 5 , type: 'Kos4x4'         , x: 0, y: 0, z: 0, angle: 0, layer: 'base',  group: 1, data: {} },
    { id: 6 , type: 'Kos4x4'         , x: 0, y: 0, z: 0, angle: 0, layer: 'base',  group: 1, data: {} },
    { id: 7 , type: 'Snuffel4x4'     , x: 0, y: 0, z: 0, angle: 0, layer: 'base',  group: 1, data: {} },
    { id: 8 , type: 'Snuffel4x4'     , x: 0, y: 0, z: 0, angle: 0, layer: 'base',  group: 1, data: {} },
    { id: 9 , type: 'Snuffel4x4'     , x: 0, y: 0, z: 0, angle: 0, layer: 'base',  group: 1, data: {} },
    { id: 10, type: 'Opvoedkunde4x4' , x: 0, y: 0, z: 0, angle: 0, layer: 'base',  group: 1, data: {} },
    { id: 11, type: 'Opvoedkunde4x4' , x: 0, y: 0, z: 0, angle: 0, layer: 'base',  group: 1, data: {} },
    { id: 12, type: 'Opvoedkunde4x4' , x: 0, y: 0, z: 0, angle: 0, layer: 'base',  group: 1, data: {} },
    { id: 13, type: 'Tema4x4'        , x: 0, y: 0, z: 0, angle: 0, layer: 'base',  group: 1, data: {} },
    { id: 14, type: 'Tema4x4'        , x: 0, y: 0, z: 0, angle: 0, layer: 'base',  group: 1, data: {} },
    { id: 15, type: 'Tema4x4'        , x: 0, y: 0, z: 0, angle: 0, layer: 'base',  group: 1, data: {} },
    { id: 16, type: 'Tema4x4'        , x: 0, y: 0, z: 0, angle: 0, layer: 'base',  group: 1, data: {} },
    { id: 17, type: 'Maker4x4'       , x: 0, y: 0, z: 0, angle: 0, layer: 'base',  group: 1, data: {} }
  ]
};

window.console.log('mapdata:', mapdata);