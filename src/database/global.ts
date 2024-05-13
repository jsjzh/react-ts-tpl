import createDB from "@/shared/createDB";

const db = createDB({ name: "global" });

export const customizedCloudProductProposalColumns = {
  set: (value: { [k: string]: boolean }) =>
    db.set<{ [k: string]: boolean }>(
      "customizedCloudProductProposalColumns",
      value,
    ),
  get: () =>
    db.get<{ [k: string]: boolean }>("customizedCloudProductProposalColumns"),
  remove: () => db.remove("customizedCloudProductProposalColumns"),
};

export const customizedContainerProposalColumns = {
  set: (value: { [k: string]: boolean }) =>
    db.set<{ [k: string]: boolean }>(
      "customizedContainerProposalColumns",
      value,
    ),
  get: () =>
    db.get<{ [k: string]: boolean }>("customizedContainerProposalColumns"),
  remove: () => db.remove("customizedContainerProposalColumns"),
};

export const customizedBillingDetailsResourceColumns = {
  set: (value: { [k: string]: boolean }) =>
    db.set<{ [k: string]: boolean }>(
      "customizedBillingDetailsResourceColumns",
      value,
    ),
  get: () =>
    db.get<{ [k: string]: boolean }>("customizedBillingDetailsResourceColumns"),
  remove: () => db.remove("customizedBillingDetailsResourceColumns"),
};

export const customizedBillingDetailsApportionColumns = {
  set: (value: { [k: string]: boolean }) =>
    db.set<{ [k: string]: boolean }>(
      "customizedBillingDetailsApportionColumns",
      value,
    ),
  get: () =>
    db.get<{ [k: string]: boolean }>(
      "customizedBillingDetailsApportionColumns",
    ),
  remove: () => db.remove("customizedBillingDetailsApportionColumns"),
};
