/**
 * Created by gregrubino on 5/25/17.
 */

import 'styles/table.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class FlagSetTable extends React.Component {
  export(cols, rows) {
    let allCols = ['id'].concat(cols)
    let firstRow = allCols.join(',');
    let csvRows = rows.map(row => allCols.reduce((acc, x) => acc.concat(row[x]), []).join(',')).join('\n');
    let text = [firstRow, csvRows].join('\n');
    let blob = new Blob([text], {type: 'text/csv;charset=utf-8'});
    let url = window.URL.createObjectURL(blob);
    let tempLink = document.createElement('a');
    tempLink.href = url;
    tempLink.setAttribute('download', 'export.csv');
    tempLink.click();
  }
  render() {
    let total = this.props.total;
    let cols = this.props.columns;
    let rows = this.props.columns.map(label => {
      let r = {id: label};
      r[label] = '-';
      cols.filter(c => c !== label).forEach(col => {
        r[col] = (this.props.data.filter(d => d.labels.indexOf(label) !== -1)[0].size / total).toFixed(2);
      });
      return r;
    });
    if (rows.length > 0) {
      return (
        <div>
          <button onClick={ () => this.export(cols, rows) }>export csv</button>
          <BootstrapTable
            data={ rows }
            height='200px'
            striped
            hover
            condensed
            scrollTop={ 'Bottom' }
            options={
              {
                withoutNoDataText: true
              }
            }
            selectRow={
              {
                mode: 'checkbox',
                clickToSelect: true
              }
            }>
            <TableHeaderColumn
              dataField='id'
              width='200px'
              isKey={true}>ID</TableHeaderColumn>
            {
              cols.map(col => {
                return (
                  <TableHeaderColumn
                    key={col}
                    width='200px'
                    dataField={`${col}`}>{col}</TableHeaderColumn>
                );
              })
            }
          </BootstrapTable>
        </div>
      );
    } else {
      return (
        <p style={ {justifyContent: 'center'} }>There is no data to show</p>
      );
    }
  }
}

export default FlagSetTable;
