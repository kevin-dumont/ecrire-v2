const boldMap: Record<string, string> = {
  a: "𝗮",
  b: "𝗯",
  c: "𝗰",
  d: "𝗱",
  e: "𝗲",
  f: "𝗳",
  g: "𝗴",
  h: "𝗵",
  i: "𝗶",
  j: "𝗷",
  k: "𝗸",
  l: "𝗹",
  m: "𝗺",
  n: "𝗻",
  o: "𝗼",
  p: "𝗽",
  q: "𝗾",
  r: "𝗿",
  s: "𝘀",
  t: "𝘁",
  u: "𝘂",
  v: "𝘃",
  w: "𝗐",
  x: "𝗑",
  y: "𝗒",
  z: "𝗓",
  A: "𝗔",
  B: "𝗕",
  C: "𝗖",
  D: "𝗗",
  E: "𝗘",
  F: "𝗙",
  G: "𝗚",
  H: "𝗛",
  I: "𝗜",
  J: "𝗝",
  K: "𝗞",
  L: "𝗟",
  M: "𝗠",
  N: "𝗡",
  O: "𝗢",
  P: "𝗣",
  Q: "𝗤",
  R: "𝗥",
  S: "𝗦",
  T: "𝗧",
  U: "𝗨",
  V: "𝗩",
  W: "𝗪",
  X: "𝗫",
  Y: "𝗬",
  Z: "𝗭",
};

const italicMap: Record<string, string> = {
  a: "𝘢",
  b: "𝘣",
  c: "𝘤",
  d: "𝘥",
  e: "𝘦",
  f: "𝘧",
  g: "𝘨",
  h: "𝘩",
  i: "𝘪",
  j: "𝘫",
  k: "𝘬",
  l: "𝘭",
  m: "𝘮",
  n: "𝘯",
  o: "𝘰",
  p: "𝘱",
  q: "𝘲",
  r: "𝘳",
  s: "𝘴",
  t: "𝘵",
  u: "𝘶",
  v: "𝘷",
  w: "𝘸",
  x: "𝘹",
  y: "𝘺",
  z: "𝘻",
  A: "𝘈",
  B: "𝘉",
  C: "𝘊",
  D: "𝘋",
  E: "𝘌",
  F: "𝘍",
  G: "𝘎",
  H: "𝘏",
  I: "𝘐",
  J: "𝘑",
  K: "𝘒",
  L: "𝘓",
  M: "𝘔",
  N: "𝘕",
  O: "𝘖",
  P: "𝘗",
  Q: "𝘘",
  R: "𝘙",
  S: "𝘚",
  T: "𝘛",
  U: "𝘜",
  V: "𝘝",
  W: "𝘞",
  X: "𝘟",
  Y: "𝘠",
  Z: "𝘡",
};

const reverseBoldMap = Object.fromEntries(
  Object.entries(boldMap).map(([key, value]) => [value, key])
);

const reverseItalicMap = Object.fromEntries(
  Object.entries(italicMap).map(([key, value]) => [value, key])
);

function convertToNormal(text: string): string {
  return Array.from(text)
    .map((char) => reverseBoldMap[char] || reverseItalicMap[char] || char)
    .join("");
}

function removeBold(text: string): string {
  return Array.from(text)
    .map((char) => reverseBoldMap[char] || char)
    .join("");
}

function removeItalic(text: string): string {
  return Array.from(text)
    .map((char) => reverseItalicMap[char] || char)
    .join("");
}

function convertToStyled(text: string, map: Record<string, string>): string {
  return Array.from(text)
    .map((char) => map[char] || char)
    .join("");
}

export function toggleItalicText(text: string): string {
  if (text === removeItalic(text)) {
    return convertToStyled(convertToNormal(text), italicMap);
  }
  return convertToNormal(text);
}

export function toggleBoldText(text: string): string {
  if (text === removeBold(text)) {
    return convertToStyled(convertToNormal(text), boldMap);
  }
  return convertToNormal(text);
}
