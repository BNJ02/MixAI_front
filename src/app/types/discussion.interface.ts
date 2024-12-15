export interface Discussion {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
}