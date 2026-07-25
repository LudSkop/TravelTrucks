import { api } from "./api";
import { Camper } from "../types/camper";

interface GetCampersResponse {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: Camper[]; // якщо тип Camper вже десь визначений — імпортувати звідти
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
