/**
 * Created by gregrubino on 5/25/17.
 */
require('react-bootstrap-table/css/react-bootstrap-table.css');

import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class FlagSetTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data.map(d => {
        return {
          label: d.label,
          size: d.members.length
        }
      })
    };
  }
  render() {
    return (
      <BootstrapTable data={ this.props.data } options={ { noDataText: 'Please upload a CSV' } }>
        <TableHeaderColumn width={100} dataField="label" isKey={true}>Flag Field</TableHeaderColumn>
        <TableHeaderColumn width={100} dataField="size">Set Size</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default FlagSetTable;
