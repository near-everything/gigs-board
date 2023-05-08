import { request } from "near-social-bridge";

interface GetCardsResponse {
  error?: string;
  success?: boolean;
}

interface GetCardsPayload {
  title: string,
  description: string
}

const getCards = (payload: any) => {
  const options = { forceTryAgain: true }
  return request<GetCardsResponse>("get-cards", payload, options);
};
export default getCards;
