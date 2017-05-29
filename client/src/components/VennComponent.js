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


const VennComponent = createReactClass({
  mixins: [ReactFauxDOM.mixins.core, ReactFauxDOM.mixins.anim],
  propsTypes: {
    title: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object)
  },
  getInitialState() {
    return {
      width: '0',
      height: '0'
    };
  },
  shouldComponentUpdate(nextProps) {
    return JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data);
  },
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions.bind(this));
  },
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions.bind(this));
  },
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  },

  export(canvas) {
    let url = canvas.toDataURL('image/png');
    let tempLink = document.createElement('a');
    tempLink.href = url;
    tempLink.setAttribute('download', 'export.png');
    tempLink.click();
  },

  render() {

    if (!this.props.data.length) return (
      <div><p>Drop a CSV file in the box above</p></div>
    );
    let data = this.props.data.map(p =>
    {
      return {
        sets: p.labels,
        size: p.size
      }
    });
    let totalPopulation = data
      .filter(x => x.sets.length === 1)
      .reduce((acc, x) => acc + x.size, 0);

    if (this.connectedFauxDOM['chart']) delete this.connectedFauxDOM['chart'];

    let faux = this.connectFauxDOM('div', 'chart');
    let chart = VennDiagram()
      .width(parseInt(this.state.width))
      .height(parseInt(this.state.height));
    let div = d3.select(faux).datum(data),
      layout = chart(div),
      textCentres = layout.textCentres;

    let genText = function(d) {
      return `${(100 * (d.size / totalPopulation)).toFixed(2)}`;
    };
    layout.enter
      .append('text')
      .attr('class', 'sublabel')
      .text(genText)
      .style('fill', '#333')
      .style('font-size', '10px')
      .attr('text-anchor', 'middle')
      .attr('dy', '18')
      .attr('x', function(d) { return textCentres[d.sets].x; })
      .attr('y', function(d) { return textCentres[d.sets].y; });
    div.call(chart);

    let buttonStyle = {
      backgroundColor: '#F9692C'
    };
    return (
      <div>
        <button
          onClick={() => {

            let canvas = document.createElement('canvas');
            canvas.width = parseInt(this.state.width);
            canvas.height = parseInt(this.state.height);

            let ctx = canvas.getContext('2d');
            let svgXML = (new XMLSerializer()).serializeToString(document.getElementsByTagName('svg')[0]);
            let DOMURL = window.URL || window.webkitURL || window;

            let image = new Image();
            let svgBlob = new Blob([svgXML], {type: 'image/svg+xml;charset=utf-8'});
            let url = DOMURL.createObjectURL(svgBlob);

            image.onload = () => {
              if (image.complete) {
                ctx.drawImage(image, 0, 0);
                DOMURL.revokeObjectURL(url);
                this.export(canvas);
              }
            };
            image.src = url;

          } }
          style={buttonStyle}>download</button>
        {faux.toReact()}
      </div>
    );
  }

});

export default VennComponent;
