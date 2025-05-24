import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { type AxiosPromise } from "axios";
import type { IMotorcycleDTO } from "../interfaces/IMotorcycleDTO";

const API_URL = "http://localhost:8080";

const fetchMotorcycles = async (): AxiosPromise<IMotorcycleDTO[]> => {
  return axios.get(`${API_URL}/api/motorcycles`);
};

export function useMotorcycleData() {
  const query = useQuery({
    queryKey: ["motorcycle-data"],
    queryFn: fetchMotorcycles,
  });

  return {
    ...query,
    data: query.data?.data,
  };
}

export function useCreateMotorcycle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IMotorcycleDTO) =>
      axios.post(`${API_URL}/api/motorcycles`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["motorcycle-data"] });
    },
  });
}

export function useUpdateMotorcycle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IMotorcycleDTO }) =>
      axios.put(`${API_URL}/api/motorcycles/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["motorcycle-data"] });
    },
  });
}

export function useDeleteMotorcycle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      axios.delete(`${API_URL}/api/motorcycles/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["motorcycle-data"] });
    },
  });
}
