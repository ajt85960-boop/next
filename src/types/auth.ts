export type SessionPayload = {
  userId: string;
  role: "ADMIN" | "MANAGER" | "ANNOTATOR";
};

export type LoginBody = {
  username: string;
  password: string;
};
