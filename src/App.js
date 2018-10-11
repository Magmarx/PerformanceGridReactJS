import React, { Component } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css'

let jsonDataParent = { "uuidToken": "1D21339A-3204-42D3-9EC3-BEAD8DF7DE49", "uuidStructureViewerAlert": "F31A821A-7C29-4737-AFF4-97DD50E17E91", "eventList": ["508491DB-220D-4C52-BC86-142D15495674"], "keyFilter": "queue", "listEncryptedMask": [], "keyFilterValue": "0bb243b4-9fbb-47c0-8bf1-da73060bf1a0", "dateParams": { "all": true, "intervalName": "", "intervalValue": 0, "startDate": null, "endDate": null }, "pending": false, "page": 1, "start": 0, "limit": 100 }


let jsonDataVisor = { "uuidToken": "1D21339A-3204-42D3-9EC3-BEAD8DF7DE49", "uuid": "F31A821A-7C29-4737-AFF4-97DD50E17E91", "uuidEvent": "508491DB-220D-4C52-BC86-142D15495674" }

let defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

let recolectedColumns = [];

const requestData = (url, pageSize, page, sorted, filtered) => {
  return new Promise((resolve, reject) => {

    jsonDataParent.page = page;
    jsonDataParent.start = page * pageSize;
    jsonDataParent.limit = pageSize;

    fetch(url, {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify(jsonDataParent)
    })
      .then(res => res.json())
      .then(
        (result) => {
          resolve(result);
        }, (error) => {
          reject(error);
        }
      )
  });
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      pages: null,
      loading: true
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    fetch("http://192.168.14.74:50001/visor.svc/getVisor", {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify(jsonDataVisor)
    })
      .then(res => res.json())
      .then(
        (result) => {          
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

  fetchData(state, instance) {
    // Whenever the table model changes, or the user sorts or changes pages, this method gets called and passed the current table model.
    // You can set the `loading` prop of the table to true to use the built-in one or show you're own loading bar if you want.
    this.setState({ loading: true });
    // Request the data however you want.  Here, we'll use our mocked service we created earlier
    requestData(
      "http://192.168.14.74:50004/investigationCases.svc/dataParent",
      state.pageSize,
      state.page,
      state.sorted,
      state.filtered
    ).then(res => {
      // Now just get the rows of data to your React Table (and update anything else like total pages or loading)          
      this.setState({
        data: JSON.parse(res.dtParent),
        pages: Math.round(res.totalCount / state.pageSize),
        loading: false
      });
    });
  }

  render() {
    const { data, pages, loading } = this.state;
    if (this.state.columns) {
      return (
        <ReactTable                    
          columns={this.state.columns}
          manual          
          data={data}
          pages={pages} 
          loading={loading} 
          onFetchData={this.fetchData} 
          filterable
          defaultPageSize={10}
          className="-striped -highlight"
        />
      );
    }

    return <div>Loading...</div>;
  }
}

export default App;
