interface cityDetail {
  city_id: number;
  city_name: string;
}

interface City {
  city: cityDetail[] | undefined;
  refreshCity: boolean;
}
