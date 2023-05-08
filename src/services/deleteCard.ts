import { request } from "near-social-bridge";

interface DeleteCardResponse {
  error?: string;
  success?: boolean;
}

interface DeleteCardPayload {
  card: any, // This should match the data type
  laneId: string
}

const deleteCard = (payload: DeleteCardPayload) => {
  return request<DeleteCardResponse>("delete-card", payload);
};
export default deleteCard;
