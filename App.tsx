import 'react-native-gesture-handler';

// Make sure we are not running inside Jest environment
if (!process.env.JEST_WORKER_ID && __DEV__) {
  require('react-devtools-core').connectToDevTools({
    host: 'localhost',
    port: 8097,
  });
}

import {Main} from '@src';

const App = () => <Main />;

export default App;
