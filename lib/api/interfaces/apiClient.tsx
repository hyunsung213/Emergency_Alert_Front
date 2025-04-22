import { FetchClient } from "./fetchClient";

const baseUrl = "http://192.168.0.133:4000";

const apiClient = new FetchClient(baseUrl || "");

export default apiClient;
