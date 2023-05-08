import {
  Box,
  Button,
  Collapse,
  ModalBody,
  ModalContent,
  ModalHeader,
  Text,
  Heading,
  Flex
} from "@chakra-ui/react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

/**
 * These are the details of a card after clicked.
 * Access the fields from selectedCard.
 *
 * Displays within a Chakra modal on GigsBoard
 */
const GigsCardDetails = ({ selectedCard, onClose }) => {
  const [isAdvancedDetailsOpen, setIsAdvancedDetailsOpen] = useState(false);

  const handleAdvancedDetailsToggle = () => {
    setIsAdvancedDetailsOpen(!isAdvancedDetailsOpen);
  };

  return (
    <ModalContent>
      <ModalHeader display="flex" justifyContent="space-between" alignItems="center">
        <Heading size="md">{selectedCard?.title}</Heading>
        <Button colorScheme="blue" onClick={onClose}>
          Close
        </Button>
      </ModalHeader>
      <ModalBody>
        <Flex flexDirection="column" alignItems="left">
          <Text fontSize="md" mb="2">
            Author: {selectedCard?.author}
          </Text>
          <Box>
          <Button onClick={handleAdvancedDetailsToggle} mb="2">
            {isAdvancedDetailsOpen ? "Hide" : "Show"} Advanced Details
          </Button>
          <Collapse in={isAdvancedDetailsOpen}>
            <Box mt="2">
              <Text fontSize="sm" mb="2">
                Block Height: {selectedCard?.blockHeight}
              </Text>
              <Text fontSize="sm" mb="2">
                Last Editor: {selectedCard?.lastEditor}
              </Text>
              <Text fontSize="sm" mb="2">
                Time Created: {selectedCard?.timeCreate}
              </Text>
              <Text fontSize="sm" mb="2">
                Time Last Edited: {selectedCard?.timeLastEdit}
              </Text>
              <Text fontSize="sm" mb="2">
                Version: {selectedCard?.version}
              </Text>
            </Box>
          </Collapse>
        </Box>
          <ReactMarkdown children={selectedCard?.body} />
        </Flex>
      </ModalBody>
    </ModalContent>
  );
};

export default GigsCardDetails;
