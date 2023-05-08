import { request } from "near-social-bridge";

interface MoveCardAcrossLanesResponse {
  error?: string;
  success?: any; // success.preventDefault === true
}

interface MoveCardAcrossLanesPayload {
  fromLaneId: string,
  toLaneId: string,
  cardId: string,
  index: number
}

const moveCardAcrossLanes = (payload: MoveCardAcrossLanesPayload) => {
  return request<MoveCardAcrossLanesResponse>("move-card-across-lanes", payload);
};

export default moveCardAcrossLanes;
