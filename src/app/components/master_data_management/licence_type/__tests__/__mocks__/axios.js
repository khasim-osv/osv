import api from "../../../../../api.json";

const licensesData = [
  {
    _id: "5ea004e80439620d96836fb7",
    modules: ["5ea004610439620d96836fb5"],
    licenseName: "BasicOne",
    noOfUsers: "10",
    noOfTransactions: "1000",
    __v: 0,
    modules_info: [
      {
        _id: "5ea004610439620d96836fb5",
        moduleName: "End of day statement",
        Web: false,
        Mobile: true,
        App: false,
        APIs: false,
        categoryId: "5e9c27636e9fb152343bfe7f",
        __v: 0,
      },
    ],
  },
  {
    _id: "5ea0086a0439620d96836fbc",
    modules: [
      "5ea004610439620d96836fb5",
      "5ea004c80439620d96836fb6",
      "5ea0051c0439620d96836fb9",
      "5ea008250439620d96836fbb",
      "5ea004fe0439620d96836fb8",
    ],
    licenseName: "Premium",
    noOfUsers: "10",
    noOfTransactions: "2000",
    __v: 0,
    modules_info: [
      {
        _id: "5ea004610439620d96836fb5",
        moduleName: "End of day statement",
        Web: false,
        Mobile: true,
        App: false,
        APIs: false,
        categoryId: "5e9c27636e9fb152343bfe7f",
        __v: 0,
      },
      {
        _id: "5ea004fe0439620d96836fb8",
        moduleName: "Payroll services",
        Web: false,
        Mobile: true,
        App: true,
        APIs: false,
        categoryId: "5ea002cd6a68db8ced6f4552",
        __v: 0,
      },
    ],
  },
];

const modulesData = [
  {
    _id: "5e931cb00f60d04f8228f06d",
    categoryId: "5e930f3c7078c0a8f5d817f2",
    moduleName: "Transaction history",
    Web: false,
    Mobile: true,
    App: false,
    APIs: true,
    __v: 0,
  },
  {
    _id: "5e931ddb0f60d04f8228f06e",
    categoryId: "5e930f3c7078c0a8f5d817f2",
    moduleName: "Payroll123 services",
    Web: true,
    Mobile: true,
    App: false,
    APIs: true,
    __v: 0,
  },
  //,{"_id":"5e931de20f60d04f8228f06f","categoryId":"5e930f3c7078c0a8f5d817f2","moduleName":"Mini statement","Web":false,"Mobile":true,"App":true,"APIs":false,"__v":0}
];

module.exports = {
  get: (url) => {
    if (url.indexOf(api.licenses) > -1) {
      return { data: { success: true, data: licensesData } };
    } else if (url.indexOf(api.modules) > -1) {
      return { data: { success: true, data: modulesData } };
    }
  },
  put: (url) => {
    if (url.indexOf(api.licenses) > -1) {
      licensesData[0].licenseName = `Platinum`;
      return { data: { success: true, data: licensesData } };
    } else if (url.indexOf(api.modules) > -1) {
      modulesData[0].moduleName = `Txn history`;
      return { data: { success: true, data: modulesData } };
    }
  },
  // post: (url, data) => {
  post: () => {
    licensesData.push({
      _id: "5ea18f9cbe85b15d900a77fd",
      modules: [
        "5ea004610439620d96836fb5",
        "5ea004c80439620d96836fb6",
        "5ea00f3b0439620d96836fbd",
      ],
      licenseName: "Gold",
      noOfUsers: "10",
      noOfTransactions: "1000",
      __v: 0,
      modules_info: [
        {
          _id: "5ea004610439620d96836fb5",
          moduleName: "End of day statement",
          Web: false,
          Mobile: true,
          App: false,
          APIs: false,
          categoryId: "5e9c27636e9fb152343bfe7f",
          __v: 0,
        },
        {
          _id: "5ea004c80439620d96836fb6",
          moduleName: "Transaction history",
          Web: true,
          Mobile: false,
          App: true,
          APIs: false,
          categoryId: "5e9c27636e9fb152343bfe7f",
          __v: 0,
        },
        {
          _id: "5ea00f3b0439620d96836fbd",
          moduleName: "Money Transfer",
          Web: false,
          Mobile: true,
          App: false,
          APIs: false,
          categoryId: "5ea002cd6a68db8ced6f4552",
          __v: 0,
        },
      ],
    });

    //   data=[];
    return { data: { success: true, data: licensesData } };
  },
};
