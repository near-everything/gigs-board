import { Flex } from "@chakra-ui/react";
import { useInitialPayload } from "near-social-bridge";
import Board from "react-trello";
import addCard from "../services/addCard";
import deleteCard from "../services/deleteCard";

const GigsBoard = () => {

  const initialPayload = useInitialPayload()

  const handleAddCard = (card, laneId) => {
    addCard({ card, laneId });
  };

  const handleDeleteCard = (card, laneId) => {
    deleteCard({ card, laneId });
  };

  return (
    <Flex flexDirection="column" alignItems="left" mt={2}>
      <Board
        data={initialPayload}
        draggable
        editable
        onCardAdd={handleAddCard}
        hideCardDeleteIcon={true}
      />
    </Flex>
  );
};

export default GigsBoard;
