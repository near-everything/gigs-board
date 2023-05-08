import { request } from "near-social-bridge";

interface AddCardResponse {
  error?: string;
  success?: boolean;
}

interface AddCardPayload {
  card: any, // This should match the data type
  laneId: string
}

const addCard = (payload: AddCardPayload) => {
  return request<AddCardResponse>("add-card", payload);
};

export default addCard;
