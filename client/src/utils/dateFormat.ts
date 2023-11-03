export const formatCreatedAt = (createdAt: string) => {
  const date = new Date(createdAt);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth()는 0부터 시작하기 때문에 1을 더합니다.
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes().toString().padStart(2, "0"); // 항상 두 자리 숫자를 유지합니다.

  return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
};
