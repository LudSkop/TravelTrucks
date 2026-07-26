import { api } from "./api";
import { Camper, CamperDetails, Review } from "../types/camper";

interface GetCampersResponse {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: Camper[];
}
interface GetCampersParams {
  page?: number;
  perPage?: number;
  location?: string;
  form?: string;
  transmission?: string;
  engine?: string;
}

export const getCampers = async ({
  page = 1,
  perPage = 4,
  location,
  form,
  transmission,
  engine,
}: GetCampersParams): Promise<GetCampersResponse> => {
  const params: GetCampersParams = {
    page,
    perPage,
  };

  if (location) params.location = location;
  if (form) params.form = form;
  if (transmission) params.transmission = transmission;
  if (engine) params.engine = engine;

  const { data } = await api.get<GetCampersResponse>("/campers", {
    params,
  });

  return data;
};

export const getCamperById = async (
  camperId: string,
): Promise<CamperDetails> => {
  const { data } = await api.get<CamperDetails>(`/campers/${camperId}`);
  return data;
};

export const getCamperReviews = async (camperId: string): Promise<Review[]> => {
  const { data } = await api.get<Review[]>(`/campers/${camperId}/reviews`);
  return data;
};

export interface BookingRequestPayload {
  name: string;
  email: string;
}

export interface BookingRequestResponse {
  message: string;
}

export const createBookingRequest = async (
  camperId: string,
  payload: BookingRequestPayload,
): Promise<BookingRequestResponse> => {
  const { data } = await api.post<BookingRequestResponse>(
    `/campers/${camperId}/booking-requests`,
    payload,
  );
  return data;
};
