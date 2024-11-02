import { MARKDOWN_CHARS, COMMON_FIXES, MAX_MESSAGE_LENGTH } from './constants';

export function formatForTelegram(text: string): string {
  if (!text.trim()) {
    throw new Error('Please enter some text to format');
  }

  if (text.length > MAX_MESSAGE_LENGTH) {
    throw new Error(`Text exceeds Telegram's ${MAX_MESSAGE_LENGTH} character limit`);
  }

  let formatted = text;

  // Применить общие исправления
  COMMON_FIXES.forEach(({ search, replace }) => {
    formatted = formatted.replace(search, replace);
  });

  // Экранировать символы Markdown
  MARKDOWN_CHARS.forEach(char => {
    const regex = new RegExp(`\\${char}`, 'g');
    formatted = formatted.replace(regex, `\\${char}`);
  });

  // Форматировать абзацы
  formatted = formatted
    .split('\n')
    .map(line => line.trim())
    .filter(line => line)
    .join('\n\n');

  // Удалить лишние новые строки
  formatted = formatted.replace(/\n{3,}/g, '\n\n');

  // Обрезать конечный результат
  return formatted.trim();
}