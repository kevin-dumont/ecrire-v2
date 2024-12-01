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

const underlineMap: Record<string, string> = {
  a: "a̲",
  b: "b̲",
  c: "c̲",
  d: "d̲",
  e: "e̲",
  f: "f̲",
  g: "g̲",
  h: "h̲",
  i: "i̲",
  j: "j̲",
  k: "k̲",
  l: "l̲",
  m: "m̲",
  n: "n̲",
  o: "o̲",
  p: "p̲",
  q: "q̲",
  r: "r̲",
  s: "s̲",
  t: "t̲",
  u: "u̲",
  v: "v̲",
  w: "w̲",
  x: "x̲",
  y: "y̲",
  z: "z̲",
  A: "A̲",
  B: "B̲",
  C: "C̲",
  D: "D̲",
  E: "E̲",
  F: "F̲",
  G: "G̲",
  H: "H̲",
  I: "I̲",
  J: "J̲",
  K: "K̲",
  L: "L̲",
  M: "M̲",
  N: "N̲",
  O: "O̲",
  P: "P̲",
  Q: "Q̲",
  R: "R̲",
  S: "S̲",
  T: "T̲",
  U: "U̲",
  V: "V̲",
  W: "W̲",
  X: "X̲",
  Y: "Y̲",
  Z: "Z̲",
};

const reverseBoldMap = Object.fromEntries(
  Object.entries(boldMap).map(([key, value]) => [value, key])
);

const reverseItalicMap = Object.fromEntries(
  Object.entries(italicMap).map(([key, value]) => [value, key])
);

function convertToNormal(text: string): string {
  return Array.from(text)
    .map((char) =>
      removeBold(removeItalic(removeUnderline(removeStrikethrough(char))))
    )
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

function removeUnderline(text: string): string {
  const underlineCombiningChar = "\u0332";

  return text.split(underlineCombiningChar).join("");
}

function convertToStyled(text: string, map: Record<string, string>): string {
  return Array.from(text)
    .map((char) => map[char] || char)
    .join("");
}

function applyUnderline(text: string): string {
  const underlineCombiningChar = "\u0332";
  return Array.from(text)
    .map((char) => char + underlineCombiningChar)
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

export function toggleUnderlineText(text: string): string {
  if (text === removeUnderline(text)) {
    return applyUnderline(convertToNormal(text));
  }
  return convertToNormal(text);
}

function applyStrikethrough(text: string): string {
  const strikethroughCombiningChar = "\u0336";
  return Array.from(text)
    .map((char) => char + strikethroughCombiningChar)
    .join("");
}

function removeStrikethrough(text: string): string {
  const strikethroughCombiningChar = "\u0336";
  return text.split(strikethroughCombiningChar).join("");
}

export function toggleStrikethroughText(text: string): string {
  if (text === removeStrikethrough(text)) {
    return applyStrikethrough(convertToNormal(text));
  }
  return convertToNormal(text);
}
