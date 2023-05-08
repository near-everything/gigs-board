import { createStackNavigator } from "near-social-bridge/navigation";
import { NavigationProps } from "./NavigationProps";

import Loading from "../components/Loading";
import Home from "../screens/Home";

const { Navigator, Screen } = createStackNavigator<NavigationProps>(
  <Loading />
);

const Routes: React.FC = () => {
  return (
    <>
      <Navigator autoHeightSync>
        <Screen name="Home" component={Home} />
      </Navigator>
    </>
  );
};

export default Routes;
