/**
 * Created by gregrubino on 5/25/17.
 */

import 'styles/table.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class FlagSetTable extends React.Component {
  export(cols, rows) {
    const allCols = ['id'].concat(cols);
    const firstRow = allCols.join(',');
    const csvRows = rows.map(row => allCols.reduce((acc, x) => acc.concat(row[x]), []).join(',')).join('\n');
    const text = [firstRow, csvRows].join('\n');
    const blob = new Blob([text], {type: 'text/csv;charset=utf-8'});
    const url = window.URL.createObjectURL(blob);
    const tempLink = document.createElement('a');
    tempLink.href = url;
    tempLink.setAttribute('download', 'export.csv');
    tempLink.click();
  }
  render() {
    const total = this.props.total;
    const cols = this.props.columns;
    const data = this.props.data;
    const singles = data.filter(p => p.labels.length === 1);
    const intersects = data.filter(p => p.labels.length === 2);
    const rows = this.props.columns.map(label => {
      const r = {id: label};
      r[label] = (100 * singles.filter(p => p.labels[0] === label)[0].size / total).toFixed(2);
      cols.filter(c => c !== label).forEach(col => {
        const labelColIntersect = intersects.filter(d => (
          d.labels.indexOf(label) !== -1 && d.labels.indexOf(col) !== -1));
        r[col] = (100 * labelColIntersect[0].size / total).toFixed(2);
      });
      return r;
    });
    if (rows.length > 0) {
      const buttonStyle = {
        backgroundColor: '#F9692C'
      };
      return (
        <div>
          <button
            style={buttonStyle}
            onClick={ () => this.export(cols, rows) }>export csv</button>
          <button
            style={buttonStyle}
            onClick={ () => this.props.rowSelectCallback(this.refs.table.state.selectedRowKeys) }>
            generate Venn diagram
          </button>
          <BootstrapTable
            ref='table'
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
        <p style={ {textAlign: 'center'} }>There is no data to show</p>
      );
    }
  }
}

export default FlagSetTable;
