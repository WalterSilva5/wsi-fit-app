export interface TableColumn {
  label: string;
  key: string;
  format?: 'date' | 'boolean' | 'currency' | 'datetime';
  colSpan?: number;
  className?: string;
}
