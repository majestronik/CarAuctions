import { getTokenWorkAround } from "@/app/actions/authActions";

const baseURL = "http://localhost:6001/";

async function get(url: string) {
  const requestOptions = {
    method: "GET",
    headers: await getHeaders(),
  };
  const response = await fetch(baseURL + url, requestOptions);
  return handleResponse(response);
}

async function post(url: string, body: {}) {
  const requestOptions = {
    method: "POST",
    headers: await getHeaders(),
    body: JSON.stringify(body),
  };
  const response = await fetch(baseURL + url, requestOptions);
  console.log(baseURL + url);
  return await handleResponse(response);
}

async function put(url: string, body: {}) {
  const requestOptions = {
    method: "PUT",
    headers: await getHeaders(),
    body: JSON.stringify(body),
  };
  const response = await fetch(baseURL + url, requestOptions);
  return await handleResponse(response);
}

async function del(url: string) {
  const requestOptions = {
    method: "DELETE",
    // headers: await getHeaders(),
  };
  const response = await fetch(baseURL + url, requestOptions);
  return await handleResponse(response);
}

async function getHeaders() {
  const token = await getTokenWorkAround();
  const headers: { [key: string]: string } = {
    "Content-type": "application/json",
  };
  if (token) {
    headers.Authorization = "Bearer " + token.access_token;
  }
  return headers;
}

async function handleResponse(response: Response) {
  const text = await response.text();
  const data = text && JSON.parse(text);

  if (response.ok) {
    return data || response.statusText;
  } else {
    const error = {
      status: response.status,
      message: response.statusText,
    };
    return { error };
  }
}

export const fetchWrapper = {
  get,
  post,
  put,
  del,
};
