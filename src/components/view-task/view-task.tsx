import { Component, h, Prop } from '@stencil/core';
import { ICard } from '../board/types';

@Component({
  tag: 'view-task',
  styleUrls: ['view-task.css'],
  assetsDirs: ['assets'],
  shadow: false,
})
export class ViewTask {
  @Prop() cod: number;
  @Prop() titled: string;
  @Prop() project: string;
  @Prop() date: string;
  @Prop() priority: 'high' | 'medium' | 'low';
  @Prop() handleChangeColumn: (idCard: number, newColumn: number) => void;
  @Prop() deleteTask: (id: number) => void;
  @Prop() editTask: (task: ICard) => void;

  changeColumn = (idCard: number, event: Event) => {
    const value = parseInt((event.target as HTMLInputElement).value);
    this.handleChangeColumn(idCard, value);
  };
  handleDelete = (id: number) => {
    this.deleteTask(id);
  };
  handleEdit = () => {
    const task: ICard = {
      id: this.cod,
      title: this.titled,
      priority: this.priority,
      date: this.date,
      project: this.project,
    };
    this.editTask(task);
  };

  render() {
    return (
      <div>
        <div class="flex  justify-between items-center mb-5">
          <p class="text-2xl text-bold text-gray-800">{this.titled}</p>
          <div class="flex">
            <button class="icons-fontawesome" type="button" onClick={() => this.handleDelete(this.cod)}>
              <i class="fa fa-trash ml-2 text-gray-400 text-sm"></i>
            </button>
            <br />
            <button type="button" onClick={() => this.handleEdit()}>
              <i class="fa fa-pen ml-2 text-gray-400 text-sm"></i>
            </button>
          </div>
        </div>

        <div class="flex mb-2">
          <div class="w-1/3">
            <p class="text-gray-500">
              <i class="fa fa-tag mr-1 text-gray-400 text-sm"></i> Project
            </p>
          </div>
          <div>{this.project}</div>
        </div>
        <div class="flex mb-2 items-center">
          <div class="w-1/3">
            <p class="text-gray-500">
              <i class="fa fa-users mr-1 text-gray-400 text-sm"></i> Assignee
            </p>
          </div>
          <div class="flex tems-center">
            <p class="p-1 rounded-full bg-indigo-600 text-white mr-1 text-sm">GR</p>
            <p class="text-sm">Gabriel Ribeiro</p>
          </div>
        </div>
        <div class="flex mb-2">
          <div class="w-1/3">
            <p class="text-gray-500">
              <i class="fa fa-bell mr-1 text-gray-400 text-sm"></i> Priority
            </p>
          </div>
          <div>{this.priority}</div>
        </div>
        <div class="flex mb-5">
          <div class="w-1/3">
            <p class="text-gray-500">
              <i class="fa fa-calendar mr-1 text-gray-400 text-sm"></i> Date
            </p>
          </div>
          <div>{this.date}</div>
        </div>

        <hr />
        <label htmlFor="colId" class="block mb-2 text-sm font-medium text-gray-900 mt-5">
          Column
        </label>
        <select
          name="colId"
          id="colId"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          onInput={event => this.changeColumn(this.cod, event)}
        >
          <option value="1">To Do</option>
          <option value="2">In Progress</option>
          <option value="3">Done</option>
        </select>
      </div>
    );
  }
}
