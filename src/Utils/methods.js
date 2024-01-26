import ToastService from "./../Components/UI/Toaster/ToastService";
import routes from "./Routes";

export async function handleLogoutRequest() {
  try {
    const response = await fetch(`${routes.host}${routes.logout}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      ToastService(`${response.status}  ${response.statusText}`, false);
      return false;
    }
    ToastService("Logout successful", true);
    return true;
  } catch (error) {
    console.error("Logout failed", error);
    return ToastService("Logout failed", false);
  }
}

export async function handleChatFetchRequest(conversationId, ctx) {
  try {
    const response = await fetch(
      `${routes.host}${routes.fetchSingleChat}${conversationId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ctx.jwt}`,
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      ToastService(`${response.status}  ${response.statusText}`, false);
      return false;
    }

    const data = await response.json();
    return { status: true, data: data };
  } catch (error) {
    console.error("ERROR", error);
    ToastService("Request failed", false);
    return false;
  }
}

export async function handleChatDeleteRequest(conversationId, ctx) {
  try {
    const response = await fetch(
      `${routes.host}${routes.deleteSingleChat}${conversationId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ctx.jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: conversationId,
        }),
        credentials: "include",
      }
    );

    if (!response.ok) {
      ToastService(`${response.status}  ${response.statusText}`, false);
      return false;
    }
    ToastService("Chat deleted", true);
    return true;
  } catch (error) {
    ToastService("Request failed", false);
    return false;
  }
}

export async function handleFetchCHats(ctx) {
  try {
    const response = await fetch(`${routes.host}${routes.fetchAllChats}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${ctx.jwt}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function handleCreditRequests(ctx) {
  try {
    const response = await fetch(`${routes.host}${routes.freeCredit}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ctx.jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: ctx.user.id,
        name: ctx.user.name,
        email: ctx.user.email,
      }),
      credentials: "include",
    });

    if (!response.ok) {
      ToastService(`${response.status}  ${response.statusText}`, false);
      return false;
    }
    ToastService("Credit request successful!", true);
    return true;
  } catch (error) {
    ToastService("Request failed", false);
    return false;
  }
}

export function handleGenerateRandomBase64() {
  const randomString = Math.random().toString(36).substring(2, 10);
  const base64Value = btoa(randomString);
  return base64Value;
}
