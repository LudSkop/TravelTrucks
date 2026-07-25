export type CamperForm = "van" | "alcove" | "integrated" | "semi_integrated";

export type Engine = "petrol" | "diesel" | "hybrid" | "electric";

export type Transmission = "automatic" | "manual";

export type Amenity =
  | "ac"
  | "bathroom"
  | "kitchen"
  | "tv"
  | "radio"
  | "refrigerator"
  | "microwave"
  | "gas"
  | "water";

export type Camper = {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  coverImage: string;
  description: string;
  totalReviews: number;
  form: CamperForm;
  transmission: Transmission;
  engine: Engine;
  amenities: Amenity[];
};

export type GetCampersResponse = {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: Camper[];
};
