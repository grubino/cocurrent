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
import NotificationSystem from 'react-notification-system';

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flags: [],
      vennFlags: [],
      columns: [],
      total: 0,
      downloading: false
    };
    this.dropzone = null;
    this.notificationSystem = null;
  }
  componentDidMount() {
    this.notificationSystem = this.refs.notificationSystem;
  }
  _handleErr(err) {
    this.setState({
      downloading: false
    });
    this.notificationSystem.addNotification({
      title: 'Error',
      level: 'error',
      position: 'tc',
      message: `${err.message}`
    });
  }
  onDrop(file) {
    this.dropzone.removeAllFiles();
    this.setState({downloading: true});
    request
      .post(`http://${config.apiHost}:${config.apiPort}/cocurrent/intersect`)
      .set('Accept', 'application/json')
      .attach('rows', file)
      .end((err, res) =>
      {
        if (err) this._handleErr(err);

        let singles = res.body.filter(x => x.labels.length === 1);
        let total = singles.reduce((acc, x) => acc + x.size, 0);
        this.setState({
          flags: res.body,
          columns: singles.map(x => x.labels[0]),
          total: total,
          downloading: false
        });
      });
  }
  onRowSelect(rowKeys) {
    this.setState({downloading: true});
    request
      .get(`http://${config.apiHost}:${config.apiPort}/cocurrent/intersect?labels=${rowKeys.join(',')}`)
      .set('Accept', 'application/json')
      .end((err, res) =>
      {
        if (err) this._handleErr(err);
        this.setState({
          vennFlags: res.body,
          downloading: false
        });
      });
  }
  render() {
    let flags = this.state.flags;
    let vennFlags = this.state.vennFlags;
    let columns = this.state.columns;
    let total = this.state.total;

    return (
      <div>
        <NotificationSystem ref="notificationSystem"/>
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
        <VennComponent data={vennFlags} title='Cocurrences'/>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
