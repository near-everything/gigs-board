import {
  Button,
  Flex,
  Input,
  Textarea
} from "@chakra-ui/react";
import { useState } from "react";
import createThing from "../services/createThing";

const CreatorForm = ({ setIsLoading, handleError, handleSuccess }) => {
  // UPDATE STATE TO HANDLE YOUR TYPE
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // UPDATE HANDLE METHODS TO MATCH YOUR STATE
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // UPDATE OBJECT TO MATCH YOUR TYPE
    const response = await createThing({
      title,
      description,
    });
    if (response.error) {
      handleError(response.error);
    } else {
      handleSuccess();
      setTitle("");
      setDescription("");
    }
    setIsLoading(false);
  };

  return (
    <Flex flexDirection="column" alignItems="left" mt={2}>
      {/* ADD YOUR INPUTS HERE */}
      <Input
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
        mb={2}
      />
      <Textarea
        placeholder="Description"
        value={description}
        onChange={handleDescriptionChange}
        mb={4}
      />
      <Button
        onClick={handleSubmit}
        isDisabled={title.length < 1 || description.length < 1}
      >
        Submit
      </Button>
    </Flex>
  );
};

export default CreatorForm;
