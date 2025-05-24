import { type ICarDTO } from "../interfaces/ICarDTO";
import axios, { type AxiosPromise } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const API_URL = "http://localhost:8080";

const fetchCars = async (): AxiosPromise<ICarDTO[]> => {
  return axios.get(API_URL + "/api/cars");
};

export function useCarData() {
  const query = useQuery({
    queryKey: ["car-data"],
    queryFn: fetchCars,
  });

  return {
    ...query,
    data: query.data?.data,
  };
}

export function useCarDataMutate() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: ICarDTO) => axios.post(API_URL + "/api/cars", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["car-data"] });
    },
  });

  return mutation;
}

export function useCarDataUpdate() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: ICarDTO & { id: string }) =>
      axios.put(API_URL + `/api/cars/${data.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["car-data"] });
    },
  });

  return mutation;
}

export function useCarDataDelete() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => axios.delete(API_URL + `/api/cars/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["car-data"] });
    },
  });

  return mutation;
}
