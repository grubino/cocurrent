# About this folder
This folder will hold all of your **flux** actions if you are using flux.
You can include actions into your components or stores like this:

```javascript
const react = require('react/addons');
const MyAction = require('actions/MyAction');
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    MyAction.exampleMethod();
  }
}
```
