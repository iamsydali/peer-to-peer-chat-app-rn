import BareProvider from './src/providers/BareProvider'
import ReduxProvider from './src/providers/ReduxProvider'
import HomeScreen from './src/screen/HomeScreen'

import { rpcHandler } from './src/lib/rpc'

export default function App() {
  return (
    <ReduxProvider>
      <BareProvider rpcHandler={rpcHandler}>
        <HomeScreen/>
      </BareProvider>
    </ReduxProvider>
  );
}
