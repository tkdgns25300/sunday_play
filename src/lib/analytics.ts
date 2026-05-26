type GtagEventParams = Record<string, string | number | boolean | object | undefined>;

type NaverConvItem = {
  id: string;
  name?: string;
  category?: string;
  quantity?: string | number;
  payAmount?: string | number;
  option?: string;
};

type NaverConv = {
  type: string;
  value?: string | number;
  id?: string;
  items?: NaverConvItem[];
};

declare global {
  interface Window {
    gtag?: (command: "event", eventName: string, params?: GtagEventParams) => void;
    wcs?: {
      trans: (conv: NaverConv) => void;
      inflow: (domain?: string) => void;
    };
    wcs_add?: Record<string, string>;
    wcs_do?: () => void;
  }
}

const NAVER_ACCOUNT_ID = "s_41a53eaf5c29";

export function trackEvent(eventName: string, params?: GtagEventParams) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", eventName, params);
}

function trackNaverConversion(conv: NaverConv) {
  if (typeof window === "undefined" || !window.wcs) return;
  if (!window.wcs_add) window.wcs_add = {};
  window.wcs_add["wa"] = NAVER_ACCOUNT_ID;
  window.wcs.trans(conv);
}

export function trackNaverPageView() {
  if (typeof window === "undefined" || !window.wcs) return;
  if (!window.wcs_add) window.wcs_add = {};
  window.wcs_add["wa"] = NAVER_ACCOUNT_ID;
  window.wcs.inflow();
  window.wcs_do?.();
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
  trackNaverConversion({
    type: "view_product",
    items: [
      {
        id: item.item_id,
        name: item.item_name,
        payAmount: item.price,
      },
    ],
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
  trackNaverConversion({
    type: "custom001",
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
  trackNaverConversion({
    type: "purchase",
    value: params.value,
    id: params.transactionId,
    items: params.items.map((item) => ({
      id: item.item_id,
      name: item.item_name,
      payAmount: item.price,
    })),
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
  trackNaverConversion({ type: "sign_up" });
}
