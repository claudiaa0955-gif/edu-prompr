
export interface PrompterSettings {
  fontSize: number;
  speed: number;
  isMirrored: boolean;
  textColor: string;
  backgroundColor: string;
  lineHeight: number;
}

export type AppMode = 'setup' | 'playing';

export interface ScriptVersion {
  id: string;
  content: string;
  timestamp: number;
  label: string;
}
