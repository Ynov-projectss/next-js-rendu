export type ApplyToOfferState = {
  status: "idle" | "success" | "error";
  message: string;
};

export const initialApplyToOfferState: ApplyToOfferState = {
  status: "idle",
  message: "",
};
