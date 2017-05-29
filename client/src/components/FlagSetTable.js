/**
 * Created by gregrubino on 5/25/17.
 */

import 'styles/table.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class FlagSetTable extends React.Component {
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
    return (
      <BootstrapTable
        data={ rows }
        height='200px'
        striped
        hover
        condensed
        scrollTop={ 'Bottom' }
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
    );
  }
}

export default FlagSetTable;
