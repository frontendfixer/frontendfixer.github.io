import { Buffer } from 'node:buffer';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { deflateSync } from 'node:zlib';

const PUBLIC_DIR = new URL('../public/', import.meta.url);

const COLORS = {
  background: '#09090b',
  backgroundAlt: '#111827',
  panel: '#0f172a',
  panelSoft: '#13243a',
  teal: '#14b8a6',
  cyan: '#22d3ee',
  blue: '#2563eb',
  purple: '#7c3aed',
  text: '#f8fafc',
  muted: '#94a3b8',
  white: '#ffffff',
};

const FONT = {
  A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
  B: ['11110', '10001', '10001', '11110', '10001', '10001', '11110'],
  C: ['01111', '10000', '10000', '10000', '10000', '10000', '01111'],
  D: ['11110', '10001', '10001', '10001', '10001', '10001', '11110'],
  E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
  F: ['11111', '10000', '10000', '11110', '10000', '10000', '10000'],
  G: ['01111', '10000', '10000', '10111', '10001', '10001', '01111'],
  H: ['10001', '10001', '10001', '11111', '10001', '10001', '10001'],
  I: ['11111', '00100', '00100', '00100', '00100', '00100', '11111'],
  J: ['00111', '00010', '00010', '00010', '00010', '10010', '01100'],
  K: ['10001', '10010', '10100', '11000', '10100', '10010', '10001'],
  L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
  M: ['10001', '11011', '10101', '10101', '10001', '10001', '10001'],
  N: ['10001', '11001', '10101', '10011', '10001', '10001', '10001'],
  O: ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
  P: ['11110', '10001', '10001', '11110', '10000', '10000', '10000'],
  Q: ['01110', '10001', '10001', '10001', '10101', '10010', '01101'],
  R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
  S: ['01111', '10000', '10000', '01110', '00001', '00001', '11110'],
  T: ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
  U: ['10001', '10001', '10001', '10001', '10001', '10001', '01110'],
  V: ['10001', '10001', '10001', '10001', '01010', '01010', '00100'],
  W: ['10001', '10001', '10001', '10101', '10101', '11011', '10001'],
  X: ['10001', '01010', '00100', '00100', '00100', '01010', '10001'],
  Y: ['10001', '01010', '00100', '00100', '00100', '00100', '00100'],
  Z: ['11111', '00001', '00010', '00100', '01000', '10000', '11111'],
  0: ['01110', '10001', '10011', '10101', '11001', '10001', '01110'],
  1: ['00100', '01100', '00100', '00100', '00100', '00100', '01110'],
  2: ['01110', '10001', '00001', '00010', '00100', '01000', '11111'],
  3: ['11110', '00001', '00001', '01110', '00001', '00001', '11110'],
  4: ['00010', '00110', '01010', '10010', '11111', '00010', '00010'],
  5: ['11111', '10000', '10000', '11110', '00001', '00001', '11110'],
  6: ['01111', '10000', '10000', '11110', '10001', '10001', '01110'],
  7: ['11111', '00001', '00010', '00100', '01000', '01000', '01000'],
  8: ['01110', '10001', '10001', '01110', '10001', '10001', '01110'],
  9: ['01110', '10001', '10001', '01111', '00001', '00001', '11110'],
  '&': ['01100', '10010', '10100', '01000', '10101', '10010', '01101'],
  '-': ['00000', '00000', '00000', '11111', '00000', '00000', '00000'],
  '+': ['00000', '00100', '00100', '11111', '00100', '00100', '00000'],
  '.': ['00000', '00000', '00000', '00000', '00000', '01100', '01100'],
  '/': ['00001', '00010', '00010', '00100', '01000', '01000', '10000'],
  '<': ['00010', '00100', '01000', '10000', '01000', '00100', '00010'],
  '>': ['01000', '00100', '00010', '00001', '00010', '00100', '01000'],
};

function hexToRgba(hex, alpha = 255) {
  const normalized = hex.replace('#', '');
  return {
    r: Number.parseInt(normalized.slice(0, 2), 16),
    g: Number.parseInt(normalized.slice(2, 4), 16),
    b: Number.parseInt(normalized.slice(4, 6), 16),
    a: alpha,
  };
}

function mix(colorA, colorB, amount) {
  const weight = Math.max(0, Math.min(1, amount));
  return {
    r: Math.round(colorA.r + (colorB.r - colorA.r) * weight),
    g: Math.round(colorA.g + (colorB.g - colorA.g) * weight),
    b: Math.round(colorA.b + (colorB.b - colorA.b) * weight),
    a: Math.round(colorA.a + (colorB.a - colorA.a) * weight),
  };
}

function createCanvas(width, height) {
  return {
    width,
    height,
    pixels: new Uint8Array(width * height * 4),
  };
}

function setPixel(canvas, x, y, color) {
  if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) {
    return;
  }

  const index = (y * canvas.width + x) * 4;
  const sourceAlpha = color.a / 255;
  const targetAlpha = canvas.pixels[index + 3] / 255;
  const outAlpha = sourceAlpha + targetAlpha * (1 - sourceAlpha);

  if (outAlpha === 0) {
    return;
  }

  canvas.pixels[index] = Math.round(
    (color.r * sourceAlpha +
      canvas.pixels[index] * targetAlpha * (1 - sourceAlpha)) /
      outAlpha,
  );
  canvas.pixels[index + 1] = Math.round(
    (color.g * sourceAlpha +
      canvas.pixels[index + 1] * targetAlpha * (1 - sourceAlpha)) /
      outAlpha,
  );
  canvas.pixels[index + 2] = Math.round(
    (color.b * sourceAlpha +
      canvas.pixels[index + 2] * targetAlpha * (1 - sourceAlpha)) /
      outAlpha,
  );
  canvas.pixels[index + 3] = Math.round(outAlpha * 255);
}

function fillRect(canvas, x, y, width, height, color) {
  const startX = Math.max(0, Math.floor(x));
  const startY = Math.max(0, Math.floor(y));
  const endX = Math.min(canvas.width, Math.ceil(x + width));
  const endY = Math.min(canvas.height, Math.ceil(y + height));

  for (let row = startY; row < endY; row += 1) {
    for (let column = startX; column < endX; column += 1) {
      setPixel(canvas, column, row, color);
    }
  }
}

function fillRoundedRect(canvas, x, y, width, height, radius, color) {
  const startX = Math.max(0, Math.floor(x));
  const startY = Math.max(0, Math.floor(y));
  const endX = Math.min(canvas.width, Math.ceil(x + width));
  const endY = Math.min(canvas.height, Math.ceil(y + height));
  const right = x + width - radius;
  const bottom = y + height - radius;

  for (let row = startY; row < endY; row += 1) {
    for (let column = startX; column < endX; column += 1) {
      const nearestX =
        column < x + radius ? x + radius : column > right ? right : column;
      const nearestY =
        row < y + radius ? y + radius : row > bottom ? bottom : row;
      const distance = Math.hypot(column - nearestX, row - nearestY);

      if (distance <= radius) {
        setPixel(canvas, column, row, color);
      }
    }
  }
}

function drawGradientBackground(canvas) {
  const base = hexToRgba(COLORS.background);
  const alt = hexToRgba(COLORS.backgroundAlt);
  const teal = hexToRgba(COLORS.teal);
  const blue = hexToRgba(COLORS.blue);
  const purple = hexToRgba(COLORS.purple);

  for (let y = 0; y < canvas.height; y += 1) {
    for (let x = 0; x < canvas.width; x += 1) {
      const linear = (x / canvas.width) * 0.3 + (y / canvas.height) * 0.2;
      let color = mix(base, alt, linear);
      const tealGlow =
        1 - Math.min(1, Math.hypot(x - canvas.width * 0.86, y - 120) / 520);
      const purpleGlow =
        1 -
        Math.min(
          1,
          Math.hypot(x - canvas.width * 0.16, y - canvas.height * 0.88) / 480,
        );
      const blueGlow =
        1 -
        Math.min(
          1,
          Math.hypot(x - canvas.width * 0.55, y - canvas.height * 0.48) / 700,
        );

      color = mix(color, teal, tealGlow * 0.22);
      color = mix(color, purple, purpleGlow * 0.2);
      color = mix(color, blue, blueGlow * 0.12);
      setPixel(canvas, x, y, color);
    }
  }
}

function drawGrid(canvas) {
  const lineColor = hexToRgba(COLORS.white, 14);

  for (let x = 0; x < canvas.width; x += 48) {
    fillRect(canvas, x, 0, 1, canvas.height, lineColor);
  }

  for (let y = 0; y < canvas.height; y += 48) {
    fillRect(canvas, 0, y, canvas.width, 1, lineColor);
  }
}

function measureText(text, scale, letterSpacing = scale) {
  return [...text.toUpperCase()].reduce((width, character) => {
    if (character === ' ') {
      return width + scale * 4;
    }

    const glyph = FONT[character] ?? FONT['.'];
    return width + glyph[0].length * scale + letterSpacing;
  }, 0);
}

function drawText(canvas, text, x, y, scale, color, letterSpacing = scale) {
  let cursorX = x;

  for (const character of text.toUpperCase()) {
    if (character === ' ') {
      cursorX += scale * 4;
      continue;
    }

    const glyph = FONT[character] ?? FONT['.'];

    for (let row = 0; row < glyph.length; row += 1) {
      for (let column = 0; column < glyph[row].length; column += 1) {
        if (glyph[row][column] === '1') {
          fillRect(
            canvas,
            cursorX + column * scale,
            y + row * scale,
            scale,
            scale,
            color,
          );
        }
      }
    }

    cursorX += glyph[0].length * scale + letterSpacing;
  }
}

function drawPill(canvas, x, y, text, color) {
  const scale = 3;
  const width = measureText(text, scale) + 34;

  fillRoundedRect(
    canvas,
    x,
    y,
    width,
    38,
    19,
    hexToRgba(COLORS.panelSoft, 220),
  );
  fillRoundedRect(canvas, x, y, width, 38, 19, hexToRgba(color, 28));
  drawText(canvas, text, x + 17, y + 10, scale, hexToRgba(COLORS.text, 235));
}

function drawSocialCard() {
  const canvas = createCanvas(1200, 630);

  drawGradientBackground(canvas);
  drawGrid(canvas);
  fillRoundedRect(canvas, 52, 50, 1096, 530, 42, hexToRgba(COLORS.panel, 218));
  fillRoundedRect(canvas, 54, 52, 1092, 2, 1, hexToRgba(COLORS.teal, 160));
  fillRoundedRect(canvas, 54, 578, 1092, 2, 1, hexToRgba(COLORS.purple, 130));

  fillRoundedRect(canvas, 90, 82, 292, 42, 21, hexToRgba(COLORS.teal, 36));
  drawText(
    canvas,
    'AVAILABLE FOR FREELANCE',
    112,
    96,
    2,
    hexToRgba(COLORS.cyan),
  );

  drawText(canvas, 'FRONTENDFIXER', 88, 154, 11, hexToRgba(COLORS.text));
  fillRect(canvas, 92, 246, 372, 5, hexToRgba(COLORS.teal));

  drawText(
    canvas,
    'FULL-STACK DEVELOPER FOR SAAS & MVPS',
    92,
    284,
    4,
    hexToRgba(COLORS.cyan),
  );
  drawText(
    canvas,
    'PRODUCTION-READY REACT, NESTJS, AWS',
    92,
    342,
    4,
    hexToRgba(COLORS.muted),
  );
  drawText(
    canvas,
    'AND CLOUD-NATIVE ARCHITECTURE.',
    92,
    382,
    4,
    hexToRgba(COLORS.muted),
  );

  fillRoundedRect(
    canvas,
    810,
    142,
    290,
    275,
    28,
    hexToRgba(COLORS.background, 210),
  );
  fillRoundedRect(
    canvas,
    832,
    166,
    246,
    46,
    14,
    hexToRgba(COLORS.panelSoft, 230),
  );
  fillRect(canvas, 856, 184, 26, 10, hexToRgba(COLORS.teal));
  fillRect(canvas, 896, 184, 60, 10, hexToRgba(COLORS.cyan, 180));
  fillRect(canvas, 974, 184, 78, 10, hexToRgba(COLORS.purple, 180));
  drawText(canvas, '</>', 874, 258, 15, hexToRgba(COLORS.teal));
  fillRect(canvas, 860, 365, 204, 6, hexToRgba(COLORS.cyan, 120));
  fillRect(canvas, 894, 388, 136, 6, hexToRgba(COLORS.purple, 120));

  drawPill(canvas, 92, 484, 'REACT', COLORS.teal);
  drawPill(canvas, 234, 484, 'NESTJS', COLORS.purple);
  drawPill(canvas, 396, 484, 'AWS', COLORS.blue);
  drawPill(canvas, 510, 484, 'TYPESCRIPT', COLORS.teal);

  return canvas;
}

function drawIcon(size) {
  const canvas = createCanvas(size, size);

  drawGradientBackground(canvas);
  fillRoundedRect(
    canvas,
    size * 0.08,
    size * 0.08,
    size * 0.84,
    size * 0.84,
    size * 0.17,
    hexToRgba(COLORS.panel, 190),
  );

  const scale = Math.max(1, Math.floor(size / 11));
  const text = size <= 32 ? 'F' : 'FF';
  const width = measureText(text, scale, Math.max(1, Math.floor(scale / 2)));
  const x = Math.floor((size - width) / 2);
  const y = Math.floor(size / 2 - scale * 3.5);

  drawText(
    canvas,
    text,
    x,
    y,
    scale,
    hexToRgba(COLORS.text),
    Math.max(1, Math.floor(scale / 2)),
  );
  fillRect(
    canvas,
    Math.floor(size * 0.24),
    Math.floor(size * 0.74),
    Math.floor(size * 0.52),
    Math.max(2, Math.floor(size * 0.025)),
    hexToRgba(COLORS.teal),
  );

  return canvas;
}

const crcTable = Array.from({ length: 256 }, (_, index) => {
  let value = index;

  for (let bit = 0; bit < 8; bit += 1) {
    value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  }

  return value >>> 0;
});

function crc32(buffer) {
  let crc = 0xffffffff;

  for (const byte of buffer) {
    crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }

  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuffer = Buffer.from(type);
  const length = Buffer.alloc(4);
  const checksum = Buffer.alloc(4);

  length.writeUInt32BE(data.length, 0);
  checksum.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 0);

  return Buffer.concat([length, typeBuffer, data, checksum]);
}

function encodePng(canvas) {
  const header = Buffer.alloc(13);
  const raw = Buffer.alloc((canvas.width * 4 + 1) * canvas.height);

  header.writeUInt32BE(canvas.width, 0);
  header.writeUInt32BE(canvas.height, 4);
  header[8] = 8;
  header[9] = 6;
  header[10] = 0;
  header[11] = 0;
  header[12] = 0;

  for (let y = 0; y < canvas.height; y += 1) {
    const rowStart = y * (canvas.width * 4 + 1);
    raw[rowStart] = 0;
    Buffer.from(canvas.pixels.buffer).copy(
      raw,
      rowStart + 1,
      y * canvas.width * 4,
      (y + 1) * canvas.width * 4,
    );
  }

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', header),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

function encodeIco(pngBuffer, width, height) {
  const header = Buffer.alloc(22);

  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  header[6] = width >= 256 ? 0 : width;
  header[7] = height >= 256 ? 0 : height;
  header[8] = 0;
  header[9] = 0;
  header.writeUInt16LE(1, 10);
  header.writeUInt16LE(32, 12);
  header.writeUInt32LE(pngBuffer.length, 14);
  header.writeUInt32LE(header.length, 18);

  return Buffer.concat([header, pngBuffer]);
}

function writePng(relativePath, canvas) {
  const outputPath = join(PUBLIC_DIR.pathname, relativePath);

  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, encodePng(canvas));
}

const socialCard = drawSocialCard();
const favicon32 = drawIcon(32);

writePng('og-image.png', socialCard);
writePng('twitter-image.png', socialCard);
writePng('android-chrome-512x512.png', drawIcon(512));
writePng('android-chrome-192x192.png', drawIcon(192));
writePng('apple-touch-icon.png', drawIcon(180));
writePng('favicon-32x32.png', favicon32);
writePng('favicon-16x16.png', drawIcon(16));
writeFileSync(
  join(PUBLIC_DIR.pathname, 'favicon.ico'),
  encodeIco(encodePng(favicon32), 32, 32),
);
