import { request } from "near-social-bridge";

interface DeleteCardResponse {
  error?: string;
  success?: boolean;
}

// UPDATE THIS TO MATCH YOUR TYPE
interface DeleteCardPayload {
  title: string,
  description: string
}

const deleteCard = (payload: any) => {
  return request<DeleteCardResponse>("delete-card", payload);
};
export default deleteCard;
