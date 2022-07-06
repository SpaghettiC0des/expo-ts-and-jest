import 'react-native-gesture-handler';

if (__DEV__) {
  require('react-devtools-core').connectToDevTools({
    host: 'localhost',
    port: 8097,
  });
}

import {Main} from '@src';

const App = () => <Main />;

export default App;
