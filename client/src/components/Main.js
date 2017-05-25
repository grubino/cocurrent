require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import VennComponent from './VennComponent';

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flags: []
    };
  }
  onDrop(files) {
    if (!files.length) {
      return;
    }
    request
      .post('http://0a325ade.ngrok.io/cocurrent/intersect')
      .set('Accept', 'application/json')
      .attach('rows', files[0])
      .end((err, res) => {
        if (err) throw err;
        this.setState({
          flags: res.body
        });
      });
  }
  render() {
    return (
      <div className="index">
        <Dropzone className="index notice" onDrop={this.onDrop.bind(this)}>
          <p>1) Drag & drop a file here or </p>
          <p>2) Click here to find one</p>
        </Dropzone>
        <VennComponent data={this.state.flags} title="Cocurrences"/>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
