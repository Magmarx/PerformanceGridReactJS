import React, { Component } from 'react';
import './App.css';
import ReactTable from "react-table";
import 'react-table/react-table.css'

let jsonDataParent = {
  "uuidToken": "BF02A2A2-BE5A-46B9-B431-47A6C20F9490",
  "uuidStructureViewerAlert": "962D42F9-973F-4BAA-9BF1-FA0F168E2A03",
  "eventList": [
    "508491DB-220D-4C52-BC86-142D15495674",
    "D974A9EF-404F-4E1F-959D-C85841D39AC0"
  ],
  "keyFilter": "queue",
  "listEncryptedMask": [
    { "hashColumn": "COL-404219422", "mask": "5555-XXXX-XXXX-5555" }
  ],
  "keyFilterValue": "4291f016-354f-4e3e-8539-f61d484a3580",
  "dateParams": {
    "all": true,
    "intervalName": "",
    "intervalValue": 0,
    "startDate": null,
    "endDate": null
  },
  "pending": true,
  "page": 1,
  "start": 0,
  "limit": 100
}

let jsonDataVisor = {
  "uuidToken": "BF02A2A2-BE5A-46B9-B431-47A6C20F9490",
  "uuid": "962D42F9-973F-4BAA-9BF1-FA0F168E2A03",
  "uuidEvent": "508491DB-220D-4C52-BC86-142D15495674"
}
let defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

let recolectedData = [], recolectedColumns = [], errorLoading = false, loaded = false;
function restCall(url, params) {
  // return new Promise(resolve => {
  fetch(url, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(params)
  })
    .then(res => res.json())
    .then(
      (result) => {
        // resolve(result);
      }, (error) => {
        // resolve(error);
      }
    )
  // });
}

// async function returnValues() {
//   let columns = await restCall("http://192.168.14.74:50001/visor.svc/getVisor", jsonDataVisor);
//   let data = await restCall("http://192.168.14.74:50004/investigationCases.svc/dataParent", jsonDataParent)    
//   if (columns.success && data.success){
// columns.columns.forEach(columnValue => {
//   // Header: 'Name',
//   // accessor: 'name' // String-based value accessors!
//   columnValue.Header = columnValue.name;
//   columnValue.accessor = columnValue.dataIndexHash;
//   recolectedColumns = columnValue;
// });
//     // recolectedColumns = columns.column??s;
//     recolectedData = JSON.parse(data.dtParent);
//     // loaded = true;
//   } else {
//     // errorLoading = true;
//   }
//   // columns.success to validate the value of the request
//   // console.log(columns.success);
//   // console.log(data.success);
// }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pages: -1,
      loading: true,
      columns: []
    };
  }

  componentDidMount() {
    // returnValues();      
    // this.setState((prevState, props) => {
    //   let newPrevState = prevState;
    //   newPrevState.data = recolectedData;
    //   newPrevState.columns = recolectedColumns;
    //   return newPrevState;
    // });
    fetch("http://192.168.14.74:50001/visor.svc/getVisor", {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify(jsonDataVisor)
    })
      .then(res => res.json())
      .then(
        (result) => {
          debugger;
          result.columns.forEach(columnValue => {
            columnValue.Header = columnValue.name;
            columnValue.accessor = columnValue.dataIndexHash;
            recolectedColumns.push(columnValue);
          });
          this.setState({
            columns: recolectedColumns
          })
        }, (error) => {
          console.log(error);
        }
      )
  }

  render() {

    const columns = [{ "Header": "Score", "accessor": "COL-61797885", "aggregateFunction": false, "attachments": { "attachment": false, "comment": false }, "columnConfig": { "columnToolTip": null, "columnToolTipName": null, "defaultBgColor": "ffffff", "defaultFgColor": "000000", "detail": true, "filterable": false, "header": true, "index": 0, "indexDetail": 0, "isLocked": false, "isVisible": true, "showValue": false, "sortDetail": false, "sortIndexDetail": 0, "type": "0D618005-6845-4791-9A73-3A8FCD15C40A", "width": 100 }, "columnDescription": "Score", "columnId": "02FB5EB0-8556-11E8-87BD-27E591EB5E14", "dataCategories": [], "dataFormating": { "currencyName": null, "isIndex": false, "mask": null, "maskId": "", "textAlignment": "left", "uuidCurrency": "" }, "dataIndex": "Score", "dataIndexHash": "COL-61797885", "dataPresentation": [], "dataSource": { "defaultFields": null, "fields": [{ "dataTypeDescription": null, "eventName": "ACF Fraude Tarjeta", "fieldId": "58800B8E-E9A1-4FCC-B1FA-400C7E1DAC7D", "fieldName": null, "fieldType": 1, "fieldTypeCategory": "event", "fieldTypeName": "numeric", "idEvent": "508491DB-220D-4C52-BC86-142D15495674", "uniqueValue": false, "valueField": null }], "investigationFields": [], "scores": [] }, "dataType": "numeric", "encryptedEnable": false, "isEncrypted": false, "isMask": false, "maskHash": "", "name": "Score", "profileConfig": {}, "uuidAlgorithm": null },
    { "Header": "Campo por defecto Alfanumerico", "accessor": "COL-174924908", "aggregateFunction": false, "attachments": { "attachment": false, "comment": false }, "columnConfig": { "columnToolTip": null, "columnToolTipName": null, "defaultBgColor": "ffffff", "defaultFgColor": "000000", "detail": true, "filterable": false, "header": true, "index": 1, "indexDetail": 0, "isLocked": false, "isVisible": true, "showValue": false, "sortDetail": false, "sortIndexDetail": 0, "type": "1F0FB26F-3578-4597-B14B-4DE78F5D54CA", "width": 100 }, "columnDescription": "Campo por defecto Alfanumerico", "columnId": "02FBFAF0-8556-11E8-9FFE-CF7458FE97E8", "dataCategories": [], "dataFormating": { "currencyName": null, "isIndex": false, "mask": null, "maskId": "", "textAlignment": "left", "uuidCurrency": "" }, "dataIndex": "CampopordefectoAlfanumerico", "dataIndexHash": "COL-174924908", "dataPresentation": [], "dataSource": { "defaultFields": null, "fields": [], "investigationFields": [], "scores": [] }, "encryptedEnable": false, "isEncrypted": false, "isMask": false, "name": "Campo por defecto Alfanumerico", "profileConfig": {}, "uuidAlgorithm": null }]
    if (this.state.columns) {
      return (
        <ReactTable
          data={this.state.data}
          pages={this.state.pages}
          loading={this.state.loading}
          columns={this.state.columns}
          manual
          onFetchData={(state, instance) => {
            this.setState({ loading: true });
            fetch("http://192.168.14.74:50004/investigationCases.svc/dataParent", {
              method: "POST",
              headers: defaultHeaders,
              body: JSON.stringify(jsonDataParent)
            })
              .then(res => res.json())
              .then(
                (result) => {
                  this.setState({
                    data: JSON.parse(result.dtParent),
                    pages: 1,
                    loading: false
                  })
                }, (error) => {
                  console.log(error);
                }
              )
          }}
        />
      );
    }

    return <div>Loading...</div>;
  }
}

export default App;
