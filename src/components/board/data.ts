import { ICard, IColumn } from "./types"

export const TABLE_COLS: IColumn[] = [
  {
    id: 1,
    name: 'open'
  },
  {
    id: 2,
    name: 'in progress'
  },
  {
    id: 3,
    name: 'done'
  },
]


export const CARDS: ICard[] = [
  {
    id: 1,
    project: 'Project 1',
    date: '2015-12-12',
    title: 'Title task 1',
    priority: 'high',
    colId: 1
  },
  {
    id: 2,
    project: 'Project 2',
    date: '2016-12-12',
    title: 'Title task 2',
    priority: 'high',
    colId: 1
  },
  {
    id: 3,
    project: 'Project 3',
    date: '2017-12-12',
    title: 'Title task 3',
    priority: 'high',
    colId: 3
  },
]
