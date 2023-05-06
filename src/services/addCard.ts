import { request } from "near-social-bridge";

interface AddCardResponse {
  error?: string;
  success?: boolean;
}

// UPDATE THIS TO MATCH YOUR TYPE
interface AddCardPayload {
  title: string,
  description: string
}

const addCard = (payload: any) => {
  return request<AddCardResponse>("add-card", payload);
};
export default addCard;
