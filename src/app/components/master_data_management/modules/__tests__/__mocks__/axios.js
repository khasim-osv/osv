const data = [
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
  get: () => {
    return { data: { success: true, data: data } };
  },
  put: () => {
    data[0].moduleName = `Txn history`;
    return { data: { success: true, data: data } };
  },
  // post: (url, data) => {
  post: () => {
    /* let   module =  {
        _id:'1',
          moduleName: data.moduleName/*,
          Web: data.Web,
          Mobile: data.Mobile,
          App: data.App,
          APIs: data.APIs
        }*/

    //data.push(module);
    data.push({
      _id: "5e931de20f60d04f8228f0wws",
      categoryId: "5e930f3c7078c0a8f5d817f2",
      moduleName: "newValue",
      Web: false,
      Mobile: true,
      App: true,
      APIs: false,
      __v: 0,
    });

    //   data=[];
    return { data: { success: true, data: data } };
  },
};
