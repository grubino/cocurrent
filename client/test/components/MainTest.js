/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;
import createComponent from 'helpers/shallowRenderHelper';

import AppComponent from 'components/Main';

describe('MainComponent', function () {

  beforeEach(function () {
    this.MainComponent = createComponent(AppComponent);
  });

  it('should be a div.', function () {
    console.log(JSON.stringify(this.MainComponent));
    expect(this.MainComponent.type).to.equal('div');
  });
});
