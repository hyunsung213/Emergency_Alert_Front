import { FetchClient } from "./fetchClient";

const baseUrl = "http://52.63.52.70";

const apiClient = new FetchClient(baseUrl || "");

export default apiClient;
