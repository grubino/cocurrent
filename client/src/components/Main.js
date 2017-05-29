require('react-dropzone-component/styles/filepicker.css');
require('dropzone/dist/dropzone.css');
require('react-dropzone-component/dist/react-dropzone.min.js');

import React from 'react';
import FlagSetTable from './FlagSetTable';
import DropzoneComponent from 'react-dropzone-component';
import VennComponent from './VennComponent';
import request from 'superagent';
import config from 'config';
import MDSpinner from 'react-md-spinner';

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flags: [],
      columns: [],
      total: 0,
      downloading: false
    };
    this.dropzone = null;
  }
  onDrop(file) {
    this.dropzone.removeAllFiles();
    this.setState({downloading: true});
    request
      .post(`http://${config.apiHost}:${config.apiPort}/cocurrent/intersect`)
      .set('Accept', 'application/json')
      .attach('rows', file)
      .end((err, res) => {
        if (err) throw err;
        let singles = res.body.filter(x => x.labels.length === 1);
        let total = singles.reduce((acc, x) => acc + x.size, 0);
        this.setState({
          flags: res.body.filter(x => x.labels.length === 2),
          columns: singles.map(x => x.labels[0]),
          total: total,
          downloading: false
        });
      });
  }
  onRowSelect(rows) {
    rows;
  }
  render() {
    let flags = this.state.flags;
    let columns = this.state.columns;
    let total = this.state.total;

    return (
      <div>
        <DropzoneComponent
          config={
            {
              iconFiletypes: ['.csv'],
              showFiletypeIcon: true,
              maxFiles: 1,
              postUrl: 'no-url'
            }
          }
          eventHandlers={
            {
              init: dz => this.dropzone = dz,
              addedfile: this.onDrop.bind(this)
            }
          }
          djsConfig={
            {
              autoProcessQueue: false,
              acceptedFiles: 'text/csv'
            }
          }/>
        <FlagSetTable data={flags} columns={columns} total={total} rowSelectCallback={this.onRowSelect.bind(this)}/>
        {
          ((downloading) => {
            if(downloading) {
              return (
                <div style={
                  {
                    display: 'flex',
                    justifyContent: 'center'
                  }
                }>
                  <MDSpinner />
                </div>
              );
            }
          })(this.state.downloading)
        }
        <VennComponent data={[]} title='Cocurrences'/>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
