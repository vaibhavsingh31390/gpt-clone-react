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
      ToastService("Logout failed", false);
      return false;
    }
    ToastService("Logout successful", true);
    return true;
  } catch (error) {
    console.error("Logout failed", error);
    return ToastService("Logout failed", false);
  }
}

export async function handleChatFetchRequest(conversationId) {
  try {
    const response = await fetch(
      `${routes.host}${routes.fetchSingleChat}${conversationId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      ToastService("Request failed", false);
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

export async function handleChatDeleteRequest(conversationId) {
  try {
    const response = await fetch(
      `${routes.host}${routes.deleteSingleChat}${conversationId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: conversationId,
        }),
        credentials: "include",
      }
    );

    if (!response.ok) {
      ToastService("Request failed", false);
      return false;
    }
    ToastService("Chat deleted", true);
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
