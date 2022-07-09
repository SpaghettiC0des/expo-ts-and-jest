import {render} from '@testing-library/react-native';

import App from './App';

describe('<App/>', () => {
  it('should render without crashing', () => {
    const tree = render(<App />);

    expect(tree.toJSON()).not.toBeNull();
  });
});
