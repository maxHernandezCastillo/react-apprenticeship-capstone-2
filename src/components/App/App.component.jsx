import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import './App.css';
import GlobalProvider from '@providers/Global';
import Layout from '@components/Layout';
import HomePage from '@pages/Home';

library.add(fas, far);

function App() {
  return (
    <GlobalProvider>
      <Layout>
        <HomePage />
      </Layout>
    </GlobalProvider>
  );
}

export default App;
