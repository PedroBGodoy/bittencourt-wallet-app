import Config from "react-native-config";
import axios from "axios";

export async function ApiRequestData(accessToken) {
  try {
    const res = await axios(Config.BASE_URL_HEROKU + "/transactions", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      timeout: 3000
    });

    return res;
  } catch (err) {
    throw err;
  }
}

export async function ApiHandleNewTransaction(
  accessToken,
  description,
  value,
  type
) {
  try {
    console.log(type);
    const res = await axios(Config.BASE_URL_HEROKU + "/transactions", {
      method: "POST",
      data: JSON.stringify({
        description: description,
        value: value,
        type: type
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      timeout: 3000
    });

    return res;
  } catch (err) {
    throw err;
  }
}

export async function ApiHandleUpdateTransaction(
  id,
  accessToken,
  description,
  value,
  type
) {
  try {
    const res = await axios(Config.BASE_URL_HEROKU + "/transactions/" + id, {
      method: "PUT",
      data: JSON.stringify({
        description: description,
        value: value,
        type: type
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      timeout: 3000
    });

    return res;
  } catch (err) {
    throw err;
  }
}

export async function ApiHandleDeleteTransaction(id, accessToken) {
  try {
    const res = await axios(Config.BASE_URL_HEROKU + "/transactions/" + id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      timeout: 3000
    });

    return res;
  } catch (err) {
    throw err;
  }
}

export async function ApiHandleLogin(email, password) {
  try {
    const res = await fetch(Config.BASE_URL_HEROKU + "/auth/authenticate", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const resJson = await res.json();

    if (res.status !== 200) {
      throw resJson.error;
    } else {
      return resJson;
    }
  } catch (err) {
    throw err;
  }
}

export async function ApiHandleRegister(name, email, password) {
  try {
    const res = await fetch(Config.BASE_URL_HEROKU + "/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const resJson = await res.json();

    console.log(resJson);

    return resJson;
  } catch (err) {
    throw err;
  }
}
