import { request } from "near-social-bridge";

interface GetCardsResponse {
  error?: string;
  success?: boolean;
}

// UPDATE THIS TO MATCH YOUR TYPE
interface GetCardsPayload {
  title: string,
  description: string
}

const getCards = (payload: any) => {
  const options = { forceTryAgain: true }
  return request<GetCardsResponse>("get-cards", payload, options);
};
export default getCards;
