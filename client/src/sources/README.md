# About this folder
This folder will hold all of your **flux** datasources.
You can include them into your components or stores like this:

```javascript
const react = require('react/addons');
const MySource = require('sources/MyAction');
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    MySource.getRemoteData();
  }
}
```
