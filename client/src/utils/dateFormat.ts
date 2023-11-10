export const formatCreatedAt = (createdAt: string) => {
  const date = new Date(createdAt);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
  };

  return date.toLocaleString("ko-KR", options);
};
