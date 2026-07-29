// ARCHIVO GENERADO — data ficticia del Modelo de Revenue para desarrollo local.
// Fuente: "Paralela.xlsx" (hojas Precios, Estado, Valores) — el mismo Excel que se subia al modelo.
// Benchmarks de mercado (Precio 25/75, promedio competencia, $/m2) = hoja Valores; departamentos = hoja Precios.
// El estado vendido/disponible esta simulado (~20%) para poblar waterfall y modales. No se usa en staging/produccion.
/* eslint-disable */

export const MOCK_PARAMS = {
  "parameters": [
    {
      "_id": "mock-params",
      "numPredictions": 100,
      "target": 189769040.65,
      "samplePrice": 1.1
    }
  ]
};

export const MOCK_APPRECIATION_COLS = {
  "selectedAppreciations": [
    {
      "_id": "c1",
      "feature": "level",
      "nameSP": "Nivel",
      "selected": true,
      "percentage": 0.3
    },
    {
      "_id": "c2",
      "feature": "view",
      "nameSP": "Vista",
      "selected": true,
      "percentage": 0.25
    },
    {
      "_id": "c3",
      "feature": "bedrooms",
      "nameSP": "Recámaras",
      "selected": true,
      "percentage": 0.2
    },
    {
      "_id": "c4",
      "feature": "terreceType",
      "nameSP": "Tipo terraza",
      "selected": true,
      "percentage": 0.15
    },
    {
      "_id": "c5",
      "feature": "bathrooms",
      "nameSP": "Baños",
      "selected": false,
      "percentage": 0.1
    },
    {
      "_id": "c0",
      "feature": "allDepts",
      "nameSP": "Todos Depas",
      "selected": true,
      "percentage": 1.0
    }
  ]
};

export const MOCK_APPRECIATION_PROCESS = {
  "appreciationsProcess": [
    {
      "features": "level",
      "percentages": 0.3,
      "simpleAppreciation": 0.082,
      "compositeAppreciation": 0.121,
      "numDeptsAffectedBySale": 3.4
    },
    {
      "features": "view",
      "percentages": 0.25,
      "simpleAppreciation": 0.068,
      "compositeAppreciation": 0.104,
      "numDeptsAffectedBySale": 2.9
    },
    {
      "features": "bedrooms",
      "percentages": 0.2,
      "simpleAppreciation": 0.054,
      "compositeAppreciation": 0.089,
      "numDeptsAffectedBySale": 2.1
    },
    {
      "features": "terreceType",
      "percentages": 0.15,
      "simpleAppreciation": 0.041,
      "compositeAppreciation": 0.067,
      "numDeptsAffectedBySale": 1.6
    },
    {
      "features": "bathrooms",
      "percentages": 0.1,
      "simpleAppreciation": 0.028,
      "compositeAppreciation": 0.045,
      "numDeptsAffectedBySale": 1.2
    }
  ]
};

export const MOCK_REVENUE_MODEL = {
  "revenuesModel": [
    {
      "__v": 0,
      "_id": "mock-rev",
      "sales": 34558217.47,
      "accumulatedNPV": 7602807.84,
      "priceList": 134878425.96,
      "projectedAppreciationOfUnsold": 24278116.67,
      "entrysTarget": 189769040.65,
      "currentAveragePrice": 3137715.62,
      "finalAveragePrice": 3702504.43,
      "currentPricePerM2": 42649.05,
      "finalPricePerM2": 50325.87,
      "currentPrice25": 2296000.0,
      "finalPrice25": 2460311.28,
      "currentPrice75": 4214000.0,
      "finalPrice75": 4515571.31,
      "currentMarket25": 2296000.0,
      "finalMarket25": 2460311.28,
      "currentMarket75": 4214000.0,
      "finalMarket75": 4515571.31,
      "currentRevenue": 34558217.47,
      "revenueSimulations": 1000,
      "simulatedAppreciation": 0.17999999999999994
    }
  ]
};

export const MOCK_DASHBOARD = {
  "dashboards": [
    {
      "__v": 0,
      "_id": "mock-dash",
      "averagePrice": 3137715.62,
      "initialPrice25": 2296000.0,
      "finalPrice25": 2460311.28,
      "initialPrice75": 4214000.0,
      "finalPrice75": 4515571.31,
      "initialAveragePriceOfCompetition": 3235015.62,
      "finalAveragePriceOfCompetition": 3466526.75,
      "initialAveragePriceOfCompany": 3137715.62,
      "finalAveragePriceOfCompany": 3702504.43,
      "initialPrice25PerM2": 35421.0,
      "finalPrice25PerM2": 37955.87,
      "initialPrice75PerM2": 47017.0,
      "finalPrice75PerM2": 50381.73,
      "initialAveragePricePerM2OfCompetition": 43749.05,
      "finalAveragePricePerM2OfCompetition": 46879.91,
      "initialAveragePricePerM2OfCompany": 42649.05,
      "finalAveragePricePerM2OfCompany": 50325.87,
      "realizedRevenue": 34558217.47,
      "unrealizedRevenue": 134878425.96
    }
  ]
};

export const MOCK_DEPARTMENTS = {
  "departments": [
    {
      "num": 105,
      "level": 1,
      "archetype": "E",
      "bedrooms": 2,
      "program": "2BC",
      "bathrooms": 2.5,
      "view": "AMENIDAD",
      "m2int": 88.83,
      "m2ext": 25.0,
      "m2total": 113.83,
      "terreceType": "Jardín",
      "viewClumDisaggregated": "AMENIDAD",
      "price": "4098971.03",
      "pricePerM2": "36009.58",
      "target": "100%",
      "departmentState": {
        "state": "vendido"
      }
    },
    {
      "num": 302,
      "level": 3,
      "archetype": "B",
      "bedrooms": 2,
      "program": "2BL",
      "bathrooms": 2.5,
      "view": "DOBLE",
      "m2int": 101.54,
      "m2ext": 1.93,
      "m2total": 103.47,
      "terreceType": "Grande",
      "viewClumDisaggregated": "DOBLE",
      "price": "3913872.27",
      "pricePerM2": "37826.16",
      "target": "100%",
      "departmentState": {
        "state": "disponible"
      }
    },
    {
      "num": 605,
      "level": 6,
      "archetype": "D",
      "bedrooms": 2,
      "program": "2BC",
      "bathrooms": 2.5,
      "view": "AMENIDAD",
      "m2int": 88.24,
      "m2ext": 0.67,
      "m2total": 88.91,
      "terreceType": "Chica",
      "viewClumDisaggregated": "AMENIDAD",
      "price": "3852191.71",
      "pricePerM2": "43326.87",
      "target": "100%",
      "departmentState": {
        "state": "disponible"
      }
    },
    {
      "num": 704,
      "level": 7,
      "archetype": "C",
      "bedrooms": 2,
      "program": "2BC",
      "bathrooms": 2.5,
      "view": "AMENIDAD",
      "m2int": 78.31,
      "m2ext": 1.49,
      "m2total": 79.8,
      "terreceType": "Grande",
      "viewClumDisaggregated": "AMENIDAD",
      "price": "3820041.75",
      "pricePerM2": "47870.2",
      "target": "100%",
      "departmentState": {
        "state": "disponible"
      }
    },
    {
      "num": 305,
      "level": 3,
      "archetype": "E",
      "bedrooms": 2,
      "program": "2BC",
      "bathrooms": 2.5,
      "view": "AMENIDAD",
      "m2int": 88.83,
      "m2ext": 0.67,
      "m2total": 89.5,
      "terreceType": "Chica",
      "viewClumDisaggregated": "AMENIDAD",
      "price": "3711569.67",
      "pricePerM2": "41470.05",
      "target": "100%",
      "departmentState": {
        "state": "disponible"
      }
    },
    {
      "num": 404,
      "level": 4,
      "archetype": "D",
      "bedrooms": 2,
      "program": "2BC",
      "bathrooms": 2.5,
      "view": "AMENIDAD",
      "m2int": 79.14,
      "m2ext": 0.65,
      "m2total": 79.79,
      "terreceType": "Chica",
      "viewClumDisaggregated": "AMENIDAD",
      "price": "3522653.18",
      "pricePerM2": "44149.06",
      "target": "100%",
      "departmentState": {
        "state": "vendido"
      }
    },
    {
      "num": 204,
      "level": 2,
      "archetype": "D",
      "bedrooms": 2,
      "program": "2BC",
      "bathrooms": 2.5,
      "view": "AMENIDAD",
      "m2int": 79.14,
      "m2ext": 0.66,
      "m2total": 79.8,
      "terreceType": "Chica",
      "viewClumDisaggregated": "AMENIDAD",
      "price": "3483165.38",
      "pricePerM2": "43648.69",
      "target": "100%",
      "departmentState": {
        "state": "disponible"
      }
    },
    {
      "num": 303,
      "level": 3,
      "archetype": "C",
      "bedrooms": 2,
      "program": "2BC",
      "bathrooms": 2.5,
      "view": "AMENIDAD",
      "m2int": 84.47,
      "m2ext": 0.66,
      "m2total": 85.13,
      "terreceType": "Chica",
      "viewClumDisaggregated": "AMENIDAD",
      "price": "3677309.02",
      "pricePerM2": "43196.39",
      "target": "100%",
      "departmentState": {
        "state": "disponible"
      }
    },
    {
      "num": 501,
      "level": 5,
      "archetype": "A",
      "bedrooms": 2,
      "program": "2BC",
      "bathrooms": 2.5,
      "view": "CLUM",
      "m2int": 79.65,
      "m2ext": 1.49,
      "m2total": 81.14,
      "terreceType": "Grande",
      "viewClumDisaggregated": "Clum alto",
      "price": "3691796.75",
      "pricePerM2": "45499.1",
      "target": "100%",
      "departmentState": {
        "state": "disponible"
      }
    },
    {
      "num": 301,
      "level": 3,
      "archetype": "A",
      "bedrooms": 2,
      "program": "2BC",
      "bathrooms": 2.5,
      "view": "CLUM",
      "m2int": 79.65,
      "m2ext": 0.66,
      "m2total": 80.31,
      "terreceType": "Chica",
      "viewClumDisaggregated": "Clum bajo",
      "price": "3177066.67",
      "pricePerM2": "39560.04",
      "target": "100%",
      "departmentState": {
        "state": "disponible"
      }
    },
    {
      "num": 706,
      "level": 7,
      "archetype": "E",
      "bedrooms": 1,
      "program": "1Br",
      "bathrooms": 1.5,
      "view": "CLUM",
      "m2int": 58.0,
      "m2ext": 0.67,
      "m2total": 58.67,
      "terreceType": "Chica",
      "viewClumDisaggregated": "Clum alto",
      "price": "2631903.25",
      "pricePerM2": "44859.44",
      "target": "100%",
      "departmentState": {
        "state": "vendido"
      }
    },
    {
      "num": 608,
      "level": 6,
      "archetype": "G",
      "bedrooms": 1,
      "program": "1Br",
      "bathrooms": 1.5,
      "view": "CLUM",
      "m2int": 55.93,
      "m2ext": 0.0,
      "m2total": 55.93,
      "terreceType": "No",
      "viewClumDisaggregated": "Clum alto",
      "price": "2604035.71",
      "pricePerM2": "46558.84",
      "target": "100%",
      "departmentState": {
        "state": "disponible"
      }
    },
    {
      "num": 507,
      "level": 5,
      "archetype": "G",
      "bedrooms": 1,
      "program": "1Br",
      "bathrooms": 1.5,
      "view": "CLUM",
      "m2int": 55.12,
      "m2ext": 0.0,
      "m2total": 55.12,
      "terreceType": "No",
      "viewClumDisaggregated": "Clum alto",
      "price": "2536353.72",
      "pricePerM2": "46015.13",
      "target": "100%",
      "departmentState": {
        "state": "disponible"
      }
    },
    {
      "num": 406,
      "level": 4,
      "archetype": "F",
      "bedrooms": 1,
      "program": "1Br",
      "bathrooms": 1.5,
      "view": "CLUM",
      "m2int": 58.0,
      "m2ext": 0.67,
      "m2total": 58.67,
      "terreceType": "Chica",
      "viewClumDisaggregated": "Clum alto",
      "price": "2504947.94",
      "pricePerM2": "42695.55",
      "target": "100%",
      "departmentState": {
        "state": "disponible"
      }
    },
    {
      "num": 408,
      "level": 4,
      "archetype": "G",
      "bedrooms": 1,
      "program": "1Br",
      "bathrooms": 1.5,
      "view": "CLUM",
      "m2int": 55.27,
      "m2ext": 0.65,
      "m2total": 55.92,
      "terreceType": "Chica",
      "viewClumDisaggregated": "Clum alto",
      "price": "2523735.05",
      "pricePerM2": "45131.17",
      "target": "100%",
      "departmentState": {
        "state": "disponible"
      }
    },
    {
      "num": 701,
      "level": 7,
      "archetype": "X",
      "bedrooms": 1,
      "program": "1Br",
      "bathrooms": 1.0,
      "view": "CLUM",
      "m2int": 60.13,
      "m2ext": 1.49,
      "m2total": 61.62,
      "terreceType": "Grande",
      "viewClumDisaggregated": "Clum alto",
      "price": "2417438.76",
      "pricePerM2": "39231.4",
      "target": "100%",
      "departmentState": {
        "state": "vendido"
      }
    },
    {
      "num": 703,
      "level": 7,
      "archetype": "Z",
      "bedrooms": 1,
      "program": "1Br",
      "bathrooms": 1.0,
      "view": "AMENIDAD",
      "m2int": 61.41,
      "m2ext": 1.49,
      "m2total": 62.9,
      "terreceType": "Grande",
      "viewClumDisaggregated": "AMENIDAD",
      "price": "2387490.56",
      "pricePerM2": "37956.92",
      "target": "100%",
      "departmentState": {
        "state": "disponible"
      }
    },
    {
      "num": 106,
      "level": 1,
      "archetype": "F",
      "bedrooms": 1,
      "program": "1Br",
      "bathrooms": 1.5,
      "view": "CLUM",
      "m2int": 58.62,
      "m2ext": 0.0,
      "m2total": 58.62,
      "terreceType": "No",
      "viewClumDisaggregated": "Clum bajo",
      "price": "2409049.71",
      "pricePerM2": "41096.04",
      "target": "100%",
      "departmentState": {
        "state": "disponible"
      }
    },
    {
      "num": 102,
      "level": 1,
      "archetype": "B",
      "bedrooms": 2,
      "program": "2BL",
      "bathrooms": 2.5,
      "view": "DOBLE",
      "m2int": 103.1,
      "m2ext": 12.35,
      "m2total": 115.45,
      "terreceType": "Jardín",
      "viewClumDisaggregated": "DOBLE",
      "price": "4137985.63",
      "pricePerM2": "35842.23",
      "target": "100%",
      "departmentState": {
        "state": "disponible"
      }
    },
    {
      "num": 502,
      "level": 5,
      "archetype": "B",
      "bedrooms": 2,
      "program": "2BL",
      "bathrooms": 2.5,
      "view": "DOBLE",
      "m2int": 101.54,
      "m2ext": 0.0,
      "m2total": 101.54,
      "terreceType": "No",
      "viewClumDisaggregated": "DOBLE",
      "price": "3985033.59",
      "pricePerM2": "39245.95",
      "target": "100%",
      "departmentState": {
        "state": "disponible"
      }
    },
    {
      "num": 402,
      "level": 4,
      "archetype": "B",
      "bedrooms": 2,
      "program": "2BL",
      "bathrooms": 2.5,
      "view": "DOBLE",
      "m2int": 101.54,
      "m2ext": 0.0,
      "m2total": 101.54,
      "terreceType": "No",
      "viewClumDisaggregated": "DOBLE",
      "price": "3910135.23",
      "pricePerM2": "38508.32",
      "target": "100%",
      "departmentState": {
        "state": "vendido"
      }
    },
    {
      "num": 103,
      "level": 1,
      "archetype": "C",
      "bedrooms": 2,
      "program": "2BC",
      "bathrooms": 2.5,
      "view": "AMENIDAD",
      "m2int": 84.29,
      "m2ext": 18.58,
      "m2total": 102.87,
      "terreceType": "Jardín",
      "viewClumDisaggregated": "AMENIDAD",
      "price": "3985110.73",
      "pricePerM2": "38739.29",
      "target": "100%",
      "departmentState": {
        "state": "disponible"
      }
    },
    {
      "num": 202,
      "level": 2,
      "archetype": "B",
      "bedrooms": 2,
      "program": "2BL",
      "bathrooms": 2.5,
      "view": "DOBLE",
      "m2int": 103.47,
      "m2ext": 1.2,
      "m2total": 104.67,
      "terreceType": "Grande",
      "viewClumDisaggregated": "DOBLE",
      "price": "3913872.27",
      "pricePerM2": "37392.49",
      "target": "100%",
      "departmentState": {
        "state": "disponible"
      }
    },
    {
      "num": 705,
      "level": 7,
      "archetype": "D",
      "bedrooms": 2,
      "program": "2BC",
      "bathrooms": 2.5,
      "view": "AMENIDAD",
      "m2int": 88.24,
      "m2ext": 0.67,
      "m2total": 88.91,
      "terreceType": "Chica",
      "viewClumDisaggregated": "AMENIDAD",
      "price": "3917133.52",
      "pricePerM2": "44057.29",
      "target": "100%",
      "departmentState": {
        "state": "disponible"
      }
    },
    {
      "num": 505,
      "level": 5,
      "archetype": "E",
      "bedrooms": 2,
      "program": "2BC",
      "bathrooms": 2.5,
      "view": "AMENIDAD",
      "m2int": 88.91,
      "m2ext": 0.0,
      "m2total": 88.91,
      "terreceType": "No",
      "viewClumDisaggregated": "AMENIDAD",
      "price": "3825771.81",
      "pricePerM2": "43029.71",
      "target": "100%",
      "departmentState": {
        "state": "disponible"
      }
    },
    {
      "num": 405,
      "level": 4,
      "archetype": "E",
      "bedrooms": 2,
      "program": "2BC",
      "bathrooms": 2.5,
      "view": "AMENIDAD",
      "m2int": 88.24,
      "m2ext": 0.67,
      "m2total": 88.91,
      "terreceType": "Chica",
      "viewClumDisaggregated": "AMENIDAD",
      "price": "3749921.13",
      "pricePerM2": "42176.6",
      "target": "100%",
      "departmentState": {
        "state": "vendido"
      }
    },
    {
      "num": 604,
      "level": 6,
      "archetype": "C",
      "bedrooms": 2,
      "program": "2BC",
      "bathrooms": 2.5,
      "view": "AMENIDAD",
      "m2int": 79.8,
      "m2ext": 0.0,
      "m2total": 79.8,
      "terreceType": "No",
      "viewClumDisaggregated": "AMENIDAD",
      "price": "3749921.13",
      "pricePerM2": "46991.49",
      "target": "100%",
      "departmentState": {
        "state": "disponible"
      }
    },
    {
      "num": 205,
      "level": 2,
      "archetype": "E",
      "bedrooms": 2,
      "program": "2BC",
      "bathrooms": 2.5,
      "view": "AMENIDAD",
      "m2int": 88.83,
      "m2ext": 0.0,
      "m2total": 88.83,
      "terreceType": "No",
      "viewClumDisaggregated": "AMENIDAD",
      "price": "3711569.67",
      "pricePerM2": "41782.84",
      "target": "100%",
      "departmentState": {
        "state": "disponible"
      }
    },
    {
      "num": 503,
      "level": 5,
      "archetype": "C",
      "bedrooms": 2,
      "program": "2BC",
      "bathrooms": 2.5,
      "view": "AMENIDAD",
      "m2int": 84.47,
      "m2ext": 1.49,
      "m2total": 85.96,
      "terreceType": "Grande",
      "viewClumDisaggregated": "AMENIDAD",
      "price": "3797235.53",
      "pricePerM2": "44174.45",
      "target": "100%",
      "departmentState": {
        "state": "disponible"
      }
    },
    {
      "num": 504,
      "level": 5,
      "archetype": "D",
      "bedrooms": 2,
      "program": "2BC",
      "bathrooms": 2.5,
      "view": "AMENIDAD",
      "m2int": 78.31,
      "m2ext": 0.83,
      "m2total": 79.14,
      "terreceType": "Chica",
      "viewClumDisaggregated": "AMENIDAD",
      "price": "3597367.52",
      "pricePerM2": "45455.74",
      "target": "100%",
      "departmentState": {
        "state": "disponible"
      }
    },
    {
      "num": 403,
      "level": 4,
      "archetype": "C",
      "bedrooms": 2,
      "program": "2BC",
      "bathrooms": 2.5,
      "view": "AMENIDAD",
      "m2int": 84.47,
      "m2ext": 0.83,
      "m2total": 85.3,
      "terreceType": "Chica",
      "viewClumDisaggregated": "AMENIDAD",
      "price": "3715830.94",
      "pricePerM2": "43561.91",
      "target": "100%",
      "departmentState": {
        "state": "vendido"
      }
    },
    {
      "num": 203,
      "level": 2,
      "archetype": "C",
      "bedrooms": 2,
      "program": "2BC",
      "bathrooms": 2.5,
      "view": "AMENIDAD",
      "m2int": 84.47,
      "m2ext": 0.0,
      "m2total": 84.47,
      "terreceType": "No",
      "viewClumDisaggregated": "AMENIDAD",
      "price": "3677309.02",
      "pricePerM2": "43533.91",
      "target": "100%",
      "departmentState": {
        "state": "disponible"
      }
    },
    {
      "num": 304,
      "level": 3,
      "archetype": "D",
      "bedrooms": 2,
      "program": "2BC",
      "bathrooms": 2.5,
      "view": "AMENIDAD",
      "m2int": 78.31,
      "m2ext": 0.83,
      "m2total": 79.14,
      "terreceType": "Chica",
      "viewClumDisaggregated": "AMENIDAD",
      "price": "3483165.38",
      "pricePerM2": "44012.7",
      "target": "100%",
      "departmentState": {
        "state": "disponible"
      }
    },
    {
      "num": 401,
      "level": 4,
      "archetype": "A",
      "bedrooms": 2,
      "program": "2BC",
      "bathrooms": 2.5,
      "view": "CLUM",
      "m2int": 79.65,
      "m2ext": 0.83,
      "m2total": 80.48,
      "terreceType": "Chica",
      "viewClumDisaggregated": "Clum alto",
      "price": "3620543.87",
      "pricePerM2": "44986.88",
      "target": "100%",
      "departmentState": {
        "state": "disponible"
      }
    },
    {
      "num": 104,
      "level": 1,
      "archetype": "G",
      "bedrooms": 1,
      "program": "1Br",
      "bathrooms": 1.5,
      "view": "AMENIDAD",
      "m2int": 67.51,
      "m2ext": 18.58,
      "m2total": 86.09,
      "terreceType": "Jardín",
      "viewClumDisaggregated": "AMENIDAD",
      "price": "3259577.64",
      "pricePerM2": "37862.44",
      "target": "100%",
      "departmentState": {
        "state": "disponible"
      }
    },
    {
      "num": 101,
      "level": 1,
      "archetype": "A",
      "bedrooms": 2,
      "program": "2BC",
      "bathrooms": 2.5,
      "view": "CLUM",
      "m2int": 78.82,
      "m2ext": 0.0,
      "m2total": 78.82,
      "terreceType": "No",
      "viewClumDisaggregated": "Clum bajo",
      "price": "3177066.67",
      "pricePerM2": "40307.87",
      "target": "100%",
      "departmentState": {
        "state": "vendido"
      }
    },
    {
      "num": 201,
      "level": 2,
      "archetype": "A",
      "bedrooms": 2,
      "program": "2BC",
      "bathrooms": 2.5,
      "view": "CLUM",
      "m2int": 79.65,
      "m2ext": 0.0,
      "m2total": 79.65,
      "terreceType": "No",
      "viewClumDisaggregated": "Clum bajo",
      "price": "3177066.67",
      "pricePerM2": "39887.84",
      "target": "100%",
      "departmentState": {
        "state": "disponible"
      }
    },
    {
      "num": 707,
      "level": 7,
      "archetype": "F",
      "bedrooms": 1,
      "program": "1Br",
      "bathrooms": 1.5,
      "view": "CLUM",
      "m2int": 54.44,
      "m2ext": 0.67,
      "m2total": 55.11,
      "terreceType": "Chica",
      "viewClumDisaggregated": "Clum alto",
      "price": "2631903.25",
      "pricePerM2": "47757.27",
      "target": "100%",
      "departmentState": {
        "state": "disponible"
      }
    },
    {
      "num": 708,
      "level": 7,
      "archetype": "G",
      "bedrooms": 1,
      "program": "1Br",
      "bathrooms": 1.5,
      "view": "CLUM",
      "m2int": 54.44,
      "m2ext": 1.49,
      "m2total": 55.93,
      "terreceType": "Grande",
      "viewClumDisaggregated": "Clum alto",
      "price": "2647671.02",
      "pricePerM2": "47339.01",
      "target": "100%",
      "departmentState": {
        "state": "disponible"
      }
    },
    {
      "num": 606,
      "level": 6,
      "archetype": "E",
      "bedrooms": 1,
      "program": "1Br",
      "bathrooms": 1.5,
      "view": "CLUM",
      "m2int": 58.0,
      "m2ext": 0.0,
      "m2total": 58.0,
      "terreceType": "No",
      "viewClumDisaggregated": "Clum alto",
      "price": "2584650.83",
      "pricePerM2": "44562.95",
      "target": "100%",
      "departmentState": {
        "state": "disponible"
      }
    },
    {
      "num": 607,
      "level": 6,
      "archetype": "F",
      "bedrooms": 1,
      "program": "1Br",
      "bathrooms": 1.5,
      "view": "CLUM",
      "m2int": 54.44,
      "m2ext": 0.67,
      "m2total": 55.11,
      "terreceType": "Chica",
      "viewClumDisaggregated": "Clum alto",
      "price": "2584650.83",
      "pricePerM2": "46899.85",
      "target": "100%",
      "departmentState": {
        "state": "vendido"
      }
    },
    {
      "num": 506,
      "level": 5,
      "archetype": "F",
      "bedrooms": 1,
      "program": "1Br",
      "bathrooms": 1.5,
      "view": "CLUM",
      "m2int": 58.0,
      "m2ext": 0.0,
      "m2total": 58.0,
      "terreceType": "No",
      "viewClumDisaggregated": "Clum alto",
      "price": "2517472.68",
      "pricePerM2": "43404.7",
      "target": "100%",
      "departmentState": {
        "state": "disponible"
      }
    },
    {
      "num": 508,
      "level": 5,
      "archetype": "G",
      "bedrooms": 1,
      "program": "1Br",
      "bathrooms": 1.5,
      "view": "CLUM",
      "m2int": 54.44,
      "m2ext": 0.83,
      "m2total": 55.27,
      "terreceType": "Chica",
      "viewClumDisaggregated": "Clum alto",
      "price": "2536353.72",
      "pricePerM2": "45890.24",
      "target": "100%",
      "departmentState": {
        "state": "disponible"
      }
    },
    {
      "num": 407,
      "level": 4,
      "archetype": "G",
      "bedrooms": 1,
      "program": "1Br",
      "bathrooms": 1.5,
      "view": "CLUM",
      "m2int": 54.44,
      "m2ext": 0.0,
      "m2total": 54.44,
      "terreceType": "No",
      "viewClumDisaggregated": "Clum alto",
      "price": "2523735.05",
      "pricePerM2": "46358.1",
      "target": "100%",
      "departmentState": {
        "state": "disponible"
      }
    },
    {
      "num": 601,
      "level": 6,
      "archetype": "X",
      "bedrooms": 1,
      "program": "1Br",
      "bathrooms": 1.0,
      "view": "CLUM",
      "m2int": 60.96,
      "m2ext": 0.0,
      "m2total": 60.96,
      "terreceType": "No",
      "viewClumDisaggregated": "Clum alto",
      "price": "2351662.2",
      "pricePerM2": "38577.14",
      "target": "100%",
      "departmentState": {
        "state": "disponible"
      }
    },
    {
      "num": 603,
      "level": 6,
      "archetype": "Z",
      "bedrooms": 1,
      "program": "1Br",
      "bathrooms": 1.0,
      "view": "AMENIDAD",
      "m2int": 62.24,
      "m2ext": 0.0,
      "m2total": 62.24,
      "terreceType": "No",
      "viewClumDisaggregated": "AMENIDAD",
      "price": "2322528.87",
      "pricePerM2": "37315.7",
      "target": "100%",
      "departmentState": {
        "state": "vendido"
      }
    },
    {
      "num": 107,
      "level": 1,
      "archetype": "G",
      "bedrooms": 1,
      "program": "1Br",
      "bathrooms": 1.5,
      "view": "CLUM",
      "m2int": 54.44,
      "m2ext": 0.0,
      "m2total": 54.44,
      "terreceType": "No",
      "viewClumDisaggregated": "Clum bajo",
      "price": "2427117.58",
      "pricePerM2": "44583.35",
      "target": "100%",
      "departmentState": {
        "state": "disponible"
      }
    },
    {
      "num": 108,
      "level": 1,
      "archetype": "G",
      "bedrooms": 1,
      "program": "1Br",
      "bathrooms": 1.5,
      "view": "CLUM",
      "m2int": 54.44,
      "m2ext": 0.0,
      "m2total": 54.44,
      "terreceType": "No",
      "viewClumDisaggregated": "Clum bajo",
      "price": "2427117.58",
      "pricePerM2": "44583.35",
      "target": "100%",
      "departmentState": {
        "state": "disponible"
      }
    },
    {
      "num": 206,
      "level": 2,
      "archetype": "F",
      "bedrooms": 1,
      "program": "1Br",
      "bathrooms": 1.5,
      "view": "CLUM",
      "m2int": 58.62,
      "m2ext": 0.0,
      "m2total": 58.62,
      "terreceType": "No",
      "viewClumDisaggregated": "Clum bajo",
      "price": "2409049.71",
      "pricePerM2": "41096.04",
      "target": "100%",
      "departmentState": {
        "state": "disponible"
      }
    },
    {
      "num": 207,
      "level": 2,
      "archetype": "G",
      "bedrooms": 1,
      "program": "1Br",
      "bathrooms": 1.5,
      "view": "CLUM",
      "m2int": 54.44,
      "m2ext": 0.0,
      "m2total": 54.44,
      "terreceType": "No",
      "viewClumDisaggregated": "Clum bajo",
      "price": "2427117.58",
      "pricePerM2": "44583.35",
      "target": "100%",
      "departmentState": {
        "state": "disponible"
      }
    },
    {
      "num": 208,
      "level": 2,
      "archetype": "G",
      "bedrooms": 1,
      "program": "1Br",
      "bathrooms": 1.5,
      "view": "CLUM",
      "m2int": 55.27,
      "m2ext": 0.66,
      "m2total": 55.93,
      "terreceType": "Chica",
      "viewClumDisaggregated": "Clum bajo",
      "price": "2427117.58",
      "pricePerM2": "43395.63",
      "target": "100%",
      "departmentState": {
        "state": "vendido"
      }
    },
    {
      "num": 306,
      "level": 3,
      "archetype": "F",
      "bedrooms": 1,
      "program": "1Br",
      "bathrooms": 1.5,
      "view": "CLUM",
      "m2int": 58.62,
      "m2ext": 0.0,
      "m2total": 58.62,
      "terreceType": "No",
      "viewClumDisaggregated": "Clum bajo",
      "price": "2409049.71",
      "pricePerM2": "41096.04",
      "target": "100%",
      "departmentState": {
        "state": "disponible"
      }
    },
    {
      "num": 307,
      "level": 3,
      "archetype": "G",
      "bedrooms": 1,
      "program": "1Br",
      "bathrooms": 1.5,
      "view": "CLUM",
      "m2int": 54.44,
      "m2ext": 0.67,
      "m2total": 55.11,
      "terreceType": "Chica",
      "viewClumDisaggregated": "Clum bajo",
      "price": "2427117.58",
      "pricePerM2": "44041.33",
      "target": "100%",
      "departmentState": {
        "state": "disponible"
      }
    },
    {
      "num": 308,
      "level": 3,
      "archetype": "G",
      "bedrooms": 1,
      "program": "1Br",
      "bathrooms": 1.5,
      "view": "CLUM",
      "m2int": 54.44,
      "m2ext": 0.83,
      "m2total": 55.27,
      "terreceType": "Chica",
      "viewClumDisaggregated": "Clum bajo",
      "price": "2427117.58",
      "pricePerM2": "43913.83",
      "target": "100%",
      "departmentState": {
        "state": "disponible"
      }
    }
  ]
};


// ─────────────────────────────────────────────────────────────────────────────
// Vista Torre (stacking plan) — datos derivados de MOCK_DEPARTMENTS
// ─────────────────────────────────────────────────────────────────────────────
// Se construyen a partir de los mismos 54 departamentos del Excel para que la
// vista de torre y la lista de precios cuenten la misma historia. Cada
// "proyecto" ficticio reparte esos mismos departamentos en distinto número de
// torres, para que el selector de desarrollador/proyecto tenga varias
// combinaciones que probar en local (no solo una).

const MOCK_STATUS_BY_STATE: Record<string, string> = {
  vendido: 'VENDIDO',
  disponible: 'DISPONIBLE',
  apartado: 'APARTADO',
};

/** Desarrolladores reales del portafolio (mismos nombres que ya aparecen en
 * Registrar Operaciones al pegarle al backend real). Aquí solo se usan para
 * poblar el selector en local, sin backend: cada uno se queda con su único
 * proyecto de prueba y un reparto de torres distinto para variar la vista. */
const MOCK_DEVELOPERS_CONFIG = [
  { id: 'mock-dev-dynamica', name: 'Dynamica' },
  { id: 'mock-dev-gran-ciudad', name: 'Gran Ciudad' },
  { id: 'mock-dev-san-carlos', name: 'Grupo San Carlos' },
  { id: 'mock-dev-veq', name: 'GrupoVEQ' },
  { id: 'mock-dev-inverti', name: 'Inverti' },
  { id: 'mock-dev-nova-habita', name: 'Nova Habita' },
  { id: 'mock-dev-otacc', name: 'OTACC' },
  { id: 'mock-dev-procsa', name: 'PROCSA-Data' },
  { id: 'mock-dev-tare', name: 'Tare' },
];

// Repartos de torre que se van alternando entre proyectos para que no todos
// se vean iguales al probar la Vista de Torre en local.
const MOCK_TOWER_LAYOUTS = [
  ['Torre 1', 'Torre 2'],
  ['Torre A', 'Torre B', 'Torre C'],
  ['Torre Única'],
  ['Norte', 'Sur'],
];

const MOCK_PROJECTS_CONFIG = MOCK_DEVELOPERS_CONFIG.map((dev, i) => ({
  id: `mock-project-${dev.id}`,
  name: dev.name,
  developer_id: dev.id,
  towers: MOCK_TOWER_LAYOUTS[i % MOCK_TOWER_LAYOUTS.length],
}));

/** Reparte los 54 departamentos del Excel en las torres indicadas, con ids
 * únicos por proyecto para no chocar entre sí. */
function buildProjectUnits(projectId: string, towerNames: string[]) {
  return MOCK_DEPARTMENTS.departments.map((d: any, i: number) => {
    const state = String(d?.departmentState?.state ?? 'disponible').toLowerCase();
    // Cada 7ª unidad disponible pasa a apartada para poblar el color ámbar.
    const status =
      state === 'disponible' && i % 7 === 3
        ? 'APARTADO'
        : MOCK_STATUS_BY_STATE[state] ?? 'DISPONIBLE';
    const price = Number(d.price) || 0;
    const area = Number(d.m2total) || 0;
    return {
      id: `${projectId}-unit-${d.num}`,
      unit_number: String(d.num),
      typology: String(d.archetype ?? ''),
      status,
      price,
      project_id: projectId,
      stage: towerNames[i % towerNames.length],
      level: Number(d.level) || 0,
      bedrooms: Number(d.bedrooms) || null,
      bathrooms: Number(d.bathrooms) || null,
      total_area: area || null,
      m2_interior: Number(d.m2int) || null,
      m2_exterior: Number(d.m2ext) || null,
      price_m2: Number(d.pricePerM2) || (price && area ? Math.round((price / area) * 100) / 100 : null),
    };
  });
}

/** Agrupa las unidades de un proyecto por torre y nivel, igual que
 * GET /api/inventory/towers. */
function buildTowersView(projectId: string, units: ReturnType<typeof buildProjectUnits>) {
  const byTower = new Map<string, Map<number, any[]>>();
  for (const u of units) {
    const tower = u.stage || 'Sin torre';
    if (!byTower.has(tower)) byTower.set(tower, new Map());
    const levels = byTower.get(tower)!;
    const lvl = u.level ?? 0;
    if (!levels.has(lvl)) levels.set(lvl, []);
    levels.get(lvl)!.push(u);
  }

  const towers = Array.from(byTower.keys())
    .sort()
    .map(name => {
      const levels = byTower.get(name)!;
      const levelsOut = Array.from(levels.keys())
        // De mayor a menor: el piso más alto arriba.
        .sort((a, b) => b - a)
        .map(level => ({
          level,
          units: levels.get(level)!.slice().sort((a, b) =>
            String(a.unit_number).localeCompare(String(b.unit_number)),
          ),
        }));
      const total = levelsOut.reduce((n, l) => n + l.units.length, 0);
      return { name, units_total: total, levels: levelsOut };
    });

  const pricesM2 = units.map(u => u.price_m2).filter((v): v is number => typeof v === 'number' && v > 0);
  const porEstatus = units.reduce<Record<string, number>>((acc, u) => {
    acc[u.status] = (acc[u.status] ?? 0) + 1;
    return acc;
  }, {});

  return {
    project_id: projectId,
    units_total: units.length,
    por_estatus: porEstatus,
    typologies: Array.from(new Set(units.map(u => u.typology).filter(Boolean))).sort(),
    price_m2_min: pricesM2.length ? Math.min(...pricesM2) : null,
    price_m2_max: pricesM2.length ? Math.max(...pricesM2) : null,
    towers,
  };
}

/** Unidades y vista de torre de cada proyecto ficticio. */
const MOCK_PROJECTS_DATA = MOCK_PROJECTS_CONFIG.map(p => {
  const units = buildProjectUnits(p.id, p.towers);
  return { ...p, units, towersView: buildTowersView(p.id, units) };
});

/** project_id → vista de torre, para que el interceptor responda según el
 * proyecto que pida el frontend. */
export const MOCK_TOWERS_BY_PROJECT: Record<string, ReturnType<typeof buildTowersView>> =
  Object.fromEntries(MOCK_PROJECTS_DATA.map(p => [p.id, p.towersView]));

/** Todas las unidades de todos los proyectos ficticios (para la lista de
 * precios y otros usos que no distinguen por proyecto). */
export const MOCK_TOWER_UNITS = MOCK_PROJECTS_DATA.flatMap(p => p.units);

/** project_id → unidades en shape UnitRow, para GET /api/inventory/units
 * (Registrar Operaciones: selector de unidad y prellenado de precio). */
export const MOCK_UNITS_BY_PROJECT: Record<string, typeof MOCK_TOWER_UNITS> =
  Object.fromEntries(MOCK_PROJECTS_DATA.map(p => [p.id, p.units]));

/** Vista de torre por defecto (primer proyecto), por si se pide sin
 * project_id. */
export const MOCK_TOWERS = MOCK_PROJECTS_DATA[0].towersView;

/** Resumen del portafolio ficticio para GET /api/inventory/summary
 * (Resumen de Inventario). Se agrega directo de los proyectos mock. */
export const MOCK_INVENTORY_SUMMARY = (() => {
  const porEstatus: Record<string, number> = {};
  let inventoryValue = 0;
  const porProyecto = MOCK_PROJECTS_DATA.map(p => {
    let disponibles = 0, vendidas = 0, apartadas = 0, otras = 0;
    for (const u of p.units) {
      porEstatus[u.status] = (porEstatus[u.status] ?? 0) + 1;
      if (u.status === 'DISPONIBLE') { disponibles++; inventoryValue += u.price || 0; }
      else if (u.status === 'VENDIDO' || u.status === 'RENTADO') vendidas++;
      else if (u.status === 'APARTADO') apartadas++;
      else otras++;
    }
    const total = p.units.length;
    return {
      project_id: p.id,
      project_name: p.name,
      total,
      disponibles,
      vendidas,
      apartadas,
      otras,
      ventas_monto: p.units
        .filter(u => u.status === 'VENDIDO' || u.status === 'RENTADO')
        .reduce((s, u) => s + (u.price || 0), 0),
      avance_pct: total ? Math.round(((vendidas + apartadas) / total) * 1000) / 10 : 0,
    };
  });

  const ventasMonto = porProyecto.reduce((s, p) => s + p.ventas_monto, 0);
  const ventasRegistradas = porProyecto.reduce((s, p) => s + p.vendidas, 0);

  return {
    proyectos: MOCK_PROJECTS_DATA.length,
    unidades_total: MOCK_TOWER_UNITS.length,
    por_estatus: porEstatus,
    valor_inventario_disponible: inventoryValue,
    operaciones_por_tipo: { venta: ventasRegistradas },
    ventas_registradas: ventasRegistradas,
    ventas_monto: ventasMonto,
    por_proyecto: porProyecto.sort((a, b) => b.total - a.total),
  };
})();

/** GET /api/inventory/sales — ventas/apartados del rango. En el mock no hay
 * fechas reales de operación, así que se ignora el rango y se agrega todo
 * el portafolio ficticio (suficiente para que la sección renderice). */
export const MOCK_INVENTORY_SALES = (() => {
  const vendidas = MOCK_TOWER_UNITS.filter(u => u.status === 'VENDIDO' || u.status === 'RENTADO');
  const apartadas = MOCK_TOWER_UNITS.filter(u => u.status === 'APARTADO');
  return {
    from: null,
    to: null,
    unidades_vendidas: vendidas.length,
    monto_vendido: vendidas.reduce((s, u) => s + (u.price || 0), 0),
    ventas_plataforma: 0,
    ventas_base_datos: vendidas.length,
    apartados: apartadas.length,
    monto_apartados: apartadas.reduce((s, u) => s + (u.price || 0), 0),
    vendidas_sin_precio: vendidas.filter(u => !u.price).length,
  };
})();

/** Catálogo para poblar los selectores de desarrollador y proyecto. */
export const MOCK_INVENTORY_CATALOG = {
  developers: MOCK_DEVELOPERS_CONFIG,
  projects: MOCK_PROJECTS_DATA.map(p => ({
    id: p.id,
    name: p.name,
    developer_id: p.developer_id,
    units_count: p.units.length,
  })),
  units: MOCK_TOWER_UNITS.map(u => ({
    id: u.id,
    unit_number: u.unit_number,
    typology: u.typology,
    status: u.status,
    price: u.price,
    project_id: u.project_id,
    stage: u.stage,
  })),
  advisors: MOCK_PROJECTS_DATA.flatMap(p => [
    { id: `${p.id}-advisor-1`, project_id: p.id, name: 'Asesor Demo 1' },
    { id: `${p.id}-advisor-2`, project_id: p.id, name: 'Asesor Demo 2' },
  ]),
};
