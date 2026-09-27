// Change this one setting when your availability changes.
export type CareerStatus = "employed" | "open";
export const careerStatus: CareerStatus = "employed";

export function getCareerStatus(locale: "en" | "zh") {
  const open = (careerStatus as CareerStatus) === "open";
  return {
    state: careerStatus,
    label: locale === "zh" ? (open ? "開放求職中" : "目前在職") : (open ? "Open to Opportunities" : "Currently Employed"),
    description: locale === "zh" ? (open ? "歡迎合適的工作機會" : "暫不尋求新機會") : (open ? "Welcoming suitable opportunities" : "Not seeking new opportunities"),
  };
}
