# About this folder
This folder will hold all of your **flux** stores.
You can include them into your components like this:

```javascript
const react = require('react/addons');
const MyStore = require('stores/MyStore');
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    MyStore.doSomething();
  }
}
```
