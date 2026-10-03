export type ViewChoice = 'auto' | '3d' | 'static';
export const STORAGE_KEY = 'super44.view.v1';
export function parseChoice(value: string | null): ViewChoice {
  return value === '3d' || value === 'static' ? value : 'auto';
}
export function shouldLoadScene(choice: ViewChoice, reduced: boolean, consent: boolean, compact: boolean, saveData: boolean) {
  if (choice === 'static' || (reduced && !consent)) return false;
  return choice === '3d' || (!compact && !saveData);
}
export function sectionProgress(scroll: number, start: number, end: number) {
  if (end <= start) return 0;
  return Math.min(1, Math.max(0, (scroll - start) / (end - start)));
}
