// 저장된 쿠키 목록에서 parentId 값을 가져와 반환
// 정규 표현식을 통해 값 추출
export function getParentId() {
  const match = document.cookie.match(/(?:^|;\s*)parentId=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

// 사용자가 전달한 id 값을 parentId라는 이름의 쿠키로 브라우저에 저장
export function setParentId(id) {
  document.cookie = `parentId=${encodeURIComponent(id)};path=/;SameSite=Lax`;
}

// 저장된 parentId 쿠키를 강제로 만료시켜 삭제(로그아웃)
export function clearParentId() {
  document.cookie = 'parentId=;path=/;max-age=0';
}
