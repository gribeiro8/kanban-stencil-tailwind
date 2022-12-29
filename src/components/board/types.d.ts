export interface ICard {
  id: number;
  project: string;
  date: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  colId?: number;
}

export interface IColumn {
  id: number;
  name: string;
}
