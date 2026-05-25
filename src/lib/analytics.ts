type GtagEventParams = Record<string, string | number | boolean | object | undefined>;

declare global {
  interface Window {
    gtag?: (command: "event", eventName: string, params?: GtagEventParams) => void;
  }
}

export function trackEvent(eventName: string, params?: GtagEventParams) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", eventName, params);
}

export type GameItem = {
  item_id: string;
  item_name: string;
  price: number;
  currency: "KRW";
};

export function trackViewItem(item: GameItem) {
  trackEvent("view_item", {
    currency: item.currency,
    value: item.price,
    items: [item],
  });
}

export function trackSelectContent(item: GameItem) {
  trackEvent("select_content", {
    content_type: "game",
    item_id: item.item_id,
    currency: item.currency,
    value: item.price,
    items: [item],
  });
}

export function trackPurchase(params: {
  transactionId: string;
  value: number;
  items: GameItem[];
}) {
  trackEvent("purchase", {
    transaction_id: params.transactionId,
    currency: "KRW",
    value: params.value,
    items: params.items,
  });
}

export function trackFileDownload(params: {
  fileName: string;
  fileExtension: string;
  gameId: string;
}) {
  trackEvent("file_download", {
    file_name: params.fileName,
    file_extension: params.fileExtension,
    game_id: params.gameId,
  });
}

export function trackSignUp(method: "google" | "email") {
  trackEvent("sign_up", { method });
}
