import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react";
import { useState } from "react";
import Container from "../components/Container";
import CreatorForm from "../components/GigsBoard";
import Loading from "../components/Loading";
import { PreHomeScreenProps } from "../routes/NavigationProps";
import GigsBoard from "../components/GigsBoard";

const Home: React.FC<PreHomeScreenProps> = ({ navigation }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const SUCCESSFULLY_CREATED = "successfully created";

  const handleError = (errors: any) => {
    setMessage(errors);
    onOpen();
  };

  const handleSuccess = () => {
    setMessage(SUCCESSFULLY_CREATED);
    onOpen();
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Box margin={"auto"}>
      <Container>
        <GigsBoard />
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {message === SUCCESSFULLY_CREATED ? "Success" : "Error"}
            </ModalHeader>
            <ModalBody>
              <p>{message}</p>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Container>
    </Box>
  );
};

export default Home;
