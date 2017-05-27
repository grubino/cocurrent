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
import Combinatorics from 'js-combinatorics';


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

  shouldComponentUpdate(nextProps) {
    if(nextProps.data.length !== this.props.data.length) {
      return true;
    }
    return false;
  },

  render() {

    if (!this.props.data.length) return (
      <div className='index'>
        <p>Drop a CSV file in the box above</p>
      </div>
    );

    let powerSet = Combinatorics.power(this.props.data).toArray();
    let data = powerSet
      .map(x => {
        let memberSets = x.map(a => new Set(a.members));
        let memberSet = memberSets
          .reduce((acc, a) => new Set([...acc].filter(b => a.has(b))), x.length ? new Set(memberSets[0]) : new Set());
        return {
          label: x.map(a => a.label).join('&'),
          members: [...memberSet]
        };
      }).filter(x => x.members.length > 0);
    let totalPopulation = data.reduce((acc, x) => acc + x.members.length, 0);

    let presentedData = data.map(datum => {
      return {
        sets: datum.label.split('&'),
        size: datum.members.length
      };
    });

    if (this.connectedFauxDOM['chart']) delete this.connectedFauxDOM['chart'];

    let faux = this.connectFauxDOM('div', 'chart');
    let chart = VennDiagram()
      .width(640)
      .height(640);
    let div = d3.select(faux).datum(presentedData),
      layout = chart(div),
      textCentres = layout.textCentres;

    let genText = function(d) {
      return `${d.sets.join(' & ')}: ${(Math.PI * (d.size.toFixed(2) / totalPopulation)).toFixed(2)}`;
    };
    layout.enter
      .append('text')
      .attr('class', 'sublabel')
      .text(genText)
      .style('fill', '#BBB')
      .style('font-size', '10px')
      .attr('text-anchor', 'middle')
      .attr('dy', '18')
      .attr('x', function(d) { return textCentres[d.sets].x; })
      .attr('y', function(d) { return textCentres[d.sets].y; });

    div.call(chart);

    return (
      <div>
        {faux.toReact()}
      </div>
    );
  }

});

export default VennComponent;
