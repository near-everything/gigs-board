import { Box, Text, Button } from "@chakra-ui/react";

/**
 * This is the card as it appears in the lane.
 * Edit the props to include the fields you pass in from "loadCards".
 */
const GigsCard = ({ title, author, body, timeLastEdit, onClick }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" p="4">
      <Button onClick={onClick}>view</Button>
      <Text fontSize="xl" fontWeight="bold" mb="2">
        {title}
      </Text>
      <Text fontSize="md" fontWeight="medium" mb="2">
        Author: {author}
      </Text>
      <Text fontSize="md" fontWeight="medium">
        Last edited: {new Date(timeLastEdit).toLocaleString()}
      </Text>
    </Box>
  );
};

export default GigsCard;
