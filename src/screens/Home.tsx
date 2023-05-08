import Container from "../components/Container";
import GigsBoard from "../components/GigsBoard";
import { PreHomeScreenProps } from "../routes/NavigationProps";

const Home: React.FC<PreHomeScreenProps> = ({ navigation }) => {
  return (
    <Container>
      <GigsBoard />
    </Container>
  );
};

export default Home;
