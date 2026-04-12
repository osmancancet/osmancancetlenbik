import readingTime from "reading-time";

export function getReadingTime(content: string): {
  minutes: number;
  text: string;
} {
  const stats = readingTime(content, { wordsPerMinute: 220 });
  const minutes = Math.max(1, Math.round(stats.minutes));
  return { minutes, text: `${minutes} dk okuma` };
}
