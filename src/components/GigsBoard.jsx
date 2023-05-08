import {
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Button,
  Text,
  Spinner,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Board from "react-trello";
import addCard from "../services/addCard";
import deleteCard from "../services/deleteCard";
import getCards from "../services/getCards";
import GigsCard from "./GigsCard";

const template = {
  lanes: [
    {
      currentPage: 1,
      id: "proposed",
      style: {
        border: 0,
        backgroundColor: "initial",
      },
      title: "Proposed",
      cards: [],
    },
    {
      currentPage: 1,
      id: "in-progress",
      // label: "10/20",
      style: {
        border: 0,
        backgroundColor: "initial",
      },
      title: "In Progress",
      disallowAddingCard: true,
      cards: [],
    },
    {
      currentPage: 1,
      id: "completed",
      style: {
        border: 0,
        backgroundColor: "initial",
      },
      title: "Completed",
      disallowAddingCard: true,
      cards: [],
    },
  ],
};

const GigsBoard = () => {
  const [data, setData] = useState(template);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCard, setSelectedCard] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await handleGetCards();
        setData(data);
        setIsLoading(false);
        // Fix error handling, should check the object for errors
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCardAdd = (card, laneId) => {
    addCard({ card, laneId });
  };

  const handleCardDelete = (card, laneId) => {
    deleteCard({ card, laneId });
  };

  const handleCardClick = (cardId, metadata, laneId) => {
    // doesn't work when data is dragged around, cuz we don't update it after. 
    console.log(`card: ${cardId}, metadata: ${metadata}, lane: ${laneId}`);
    const card = data.lanes
      .find((lane) => lane.id === laneId)
      .cards.find((card) => card.id === cardId);

    setSelectedCard(card);
    onOpen();
  };

  const handleCardMoveAcrossLanes = (fromLaneId, toLaneId, cardId, index) => {
    console.log(`fromLaneId: ${fromLaneId}, toLaneId: ${toLaneId}, cardId: ${cardId}, index: ${index}`);
    // I'm thinking maybe the drag is allowed, but it triggers a dao proposal
    // then forces it back to where it was before (a card can only change lanes when approved by a dao)
    // OR maybe different lanes have different requirements...
  }

  function rebuildTemplate(cards, template) {
    const newLanes = template.lanes.map((lane) => {
      return {
        ...lane,
        cards: cards.filter((card) => card.laneId === lane.id),
      };
    });

    return {
      ...template,
      lanes: newLanes,
    };
  }

  const handleGetCards = async () => {
    const cards = await getCards();
    return rebuildTemplate(cards.data, template);
  };

  if (isLoading) {
    return <Spinner size="xl" />;
  }

  if (isError) {
    return (
      <Flex alignItems="center" justifyContent="center" height="100vh">
        <Box>
          <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={4}>
            Error fetching data
          </Text>
          <Button
            colorScheme="blue"
            onClick={async () => {
              const cards = await handleGetCards();
              setData(cards);
            }}
          >
            Retry
          </Button>
        </Box>
      </Flex>
    );
  }

  return (
    <Flex flexDirection="column" alignItems="left" mt={2}>
      <Board
        data={data}
        draggable
        editable
        onCardAdd={handleCardAdd}
        onCardClick={handleCardClick}
        hideCardDeleteIcon={true}
        components={{ Card: GigsCard }}
        style={{ backgroundColor: "inherit" }}
        onCardMoveAcrossLanes={handleCardMoveAcrossLanes}
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "full", md: "xl" }}
        motionPreset={{ base: "slideInBottom", md: "scale" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text>{selectedCard?.title}</Text>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalHeader>
          <ModalBody>
            <ReactMarkdown children={selectedCard?.body} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default GigsBoard;
