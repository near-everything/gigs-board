import {
  Box,
  Button,
  Flex,
  Modal, ModalOverlay,
  Spinner,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { useInitialPayload } from "near-social-bridge";
import { useEffect, useState } from "react";
import Board from "react-trello";
import addCard from "../services/addCard";
import deleteCard from "../services/deleteCard";
import getCards from "../services/getCards";
import moveCardAcrossLanes from "../services/moveCardAcrossLanes";
import GigsCard from "./GigsCard";
import GigsCardDetails from "./GigsCardDetails";

const GigsBoard = () => {
  const template = useInitialPayload();
  const [data, setData] = useState(template);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCard, setSelectedCard] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [eventBus, setEventBus] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await handleGetCards();
        setData(data);
        setIsLoading(false);
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
    // doesn't work when data is dragged around, cuz we don't update it after
    console.log(
      `card clicked: id: ${cardId}, metadata: ${metadata}, lane: ${laneId}`
    );
    const card = data.lanes
      .find((lane) => lane.id === laneId)
      .cards.find((card) => card.id === cardId);

    setSelectedCard(card);
    onOpen();
  };

  const handleCardMoveAcrossLanes = async (
    fromLaneId,
    toLaneId,
    cardId,
    index
  ) => {
    // call the bridge function
    const response = await moveCardAcrossLanes(
      fromLaneId,
      toLaneId,
      cardId,
      index
    );
    if (
      response.error ||
      (response.success && response.success.preventDefault)
    ) {
      // preventDefault === true means to not actually reflect the lane move via react-trello
      // aka: a data update is required via dao proposal or such
      eventBus.publish({
        type: "MOVE_CARD",
        fromLaneId: toLaneId,
        toLaneId: fromLaneId,
        cardId,
        index,
      });
    }
  };

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
        eventBusHandle={(handle) => setEventBus(handle)}
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "full", md: "xl" }}
        motionPreset={{ base: "slideInBottom", md: "scale" }}
      >
        <ModalOverlay />
        <GigsCardDetails selectedCard={selectedCard} onClose={onClose} />
      </Modal>
    </Flex>
  );
};

export default GigsBoard;
