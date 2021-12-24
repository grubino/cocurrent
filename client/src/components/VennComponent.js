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
    const url = canvas.toDataURL('image/png');
    const tempLink = document.createElement('a');
    tempLink.href = url;
    tempLink.setAttribute('download', 'export.png');
    tempLink.click();
  },

  render() {

    if (!this.props.data.length) return (<div></div>);
    const data = this.props.data.map(p => {
      return {
        sets: p.labels,
        size: p.size
      }
    });
    const totalPopulation = data
      .filter(x => x.sets.length === 1)
      .reduce((acc, x) => acc + x.size, 0);

    if (this.connectedFauxDOM['chart']) delete this.connectedFauxDOM['chart'];

    const faux = this.connectFauxDOM('div', 'chart');
    const chart = VennDiagram()
      .width(parseInt(this.state.width))
      .height(parseInt(this.state.height))
      .fontSize('30px');
    const div = d3.select(faux).datum(data),
      layout = chart(div),
      textCentres = layout.textCentres;

    const genText = function(d) {
      return `${(100 * (d.size / totalPopulation)).toFixed(2)}`;
    };
    chart(div)
      .style('fill-opacity', 0)
      .style('stroke-width', 2)
      .style('stroke', '#444');
    chart(div).nodes.on('mouseover', () => {
      d3.event.target.style['fill-opacity'] = 1;
    }).on('mouseout', () => {
      d3.event.target.style['fill-opacity'] = 0;
    });
    //chart(div).selectAll('.label').style('z-index', '1');
    layout.enter
      .append('text')
      .attr('class', 'sublabel')
      .text(genText)
      .style('fill', '#333')
      .attr('dy', '18')
      .attr('x', function(d) { return textCentres[d.sets].x; })
      .attr('y', function(d) { return textCentres[d.sets].y; });

    div.call(chart);

    const buttonStyle = {
      backgroundColor: '#F9692C'
    };
    return (
      <div>
        <button
          onClick={() => {

            const canvas = document.createElement('canvas');
            canvas.width = parseInt(this.state.width);
            canvas.height = parseInt(this.state.height);

            const ctx = canvas.getContext('2d');
            const svgXML = (new XMLSerializer()).serializeToString(document.getElementsByTagName('svg')[0]);
            const DOMURL = window.URL || window.webkitURL || window;

            const image = new Image();
            const svgBlob = new Blob([svgXML], {type: 'image/svg+xml;charset=utf-8'});
            const url = DOMURL.createObjectURL(svgBlob);

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
