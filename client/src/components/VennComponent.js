/**
 * Created by gregrubino on 5/24/17.
 */
require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import * as d3 from 'd3';
import { VennDiagram } from 'venn.js';
import product from 'cartesian-product';


const VennComponent = createReactClass({
  mixins: [ReactFauxDOM.mixins.core, ReactFauxDOM.mixins.anim],
  propsTypes: {
    title: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object)
  },
  getInitialState() {
    return {
      chart: 'No Data Loaded'
    };
  },
  render() {
    if (!this.props.data.length) return (
      <div className="index">
        <p>Drop a CSV file in the box above</p>
      </div>
    );

    let data = this.props.data.concat(
      product([this.props.data, this.props.data])
        .filter(x => x[0].label != x[1].label)
        .map(x => {
          return {
            label: `${x[0].label}&${x[1].label}`,
            members: x[0].members.filter(m => x[1].members.indexOf(m) !== -1)
          };
        })
        .filter(x => x.members.length > 0));

    if (this.connectedFauxDOM['chart']) {
      delete this.connectedFauxDOM['chart'];
    }
    let faux = this.connectFauxDOM('div', 'chart');
    let vd = VennDiagram();
    let presentedData = data.map(datum => {
      return {
        sets: datum.label.split('&'),
        size: datum.members.length
      };
    });

    d3.select(faux).datum(presentedData).call(vd);

    return (
      <div>
        {faux.toReact()}
      </div>
    );
  }
});

export default VennComponent;
