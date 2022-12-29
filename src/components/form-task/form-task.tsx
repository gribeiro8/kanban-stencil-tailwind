import { Component, h, Prop, State } from '@stencil/core';
import { verifyObject } from '../../utils/utils';
import { ICard } from '../board/types';

@Component({
  tag: 'form-task',
  styleUrl: 'form-task.css',
  shadow: true,
})
export class FormTask {
  @Prop({
    mutable: true,
  })
  public card: ICard = null;
  @Prop({
    mutable: true,
  })
  public selectedCol: number;

  @Prop() handleUpdateCard: (card: ICard, type: string) => void;

  @State() titleForm: string;
  @State() projectForm: string;
  @State() priorityForm: string;
  @State() dateFrom: string;

  handleTitle(event: Event) {
    this.titleForm = (event.target as HTMLInputElement).value;
  }

  handleProject(event: Event) {
    this.projectForm = (event.target as HTMLInputElement).value;
  }

  handleDate(event: Event) {
    this.dateFrom = (event.target as HTMLInputElement).value;
  }

  handlePriority(event: Event) {
    this.priorityForm = (event.target as HTMLInputElement).value;
  }

  handleSubmit(e: Event, type: string) {
    e.preventDefault();
    let updatedCard = null;
    if (type === 'edit') {
      updatedCard = {
        ...(this.titleForm && { title: this.titleForm }),
        ...(this.projectForm && { project: this.projectForm }),
        ...(this.priorityForm && { priority: this.priorityForm }),
        ...(this.dateFrom && { date: this.dateFrom }),
      };
      updatedCard = { ...this.card, ...updatedCard };
    } else {
      updatedCard = {
        id: 123,
        title: this.titleForm,
        project: this.projectForm,
        priority: this.priorityForm,
        date: this.dateFrom,
        colId: this.selectedCol,
      };
    }
    this.handleUpdateCard(updatedCard, type);
  }

  render() {
    return (
      <form class="grid grid-cols-2 gap-2" onSubmit={e => this.handleSubmit(e, verifyObject(this.card) ? 'edit' : 'add')}>
        <div class="mb-4 col-span-2">
          <label htmlFor="title" class="block mb-2 text-sm font-medium text-gray-900">
            Title
          </label>
          <input
            type="text"
            id="title"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Your Title"
            required
            onInput={e => this.handleTitle(e)}
            value={this.card && this.card.title}
          />
        </div>
        <div class="mb-4 col-span-2">
          <label htmlFor="project" class="block mb-2 text-sm font-medium text-gray-900">
            Project
          </label>
          <select
            name="project"
            id="project"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            onInput={e => this.handleProject(e)}
          >
            <option value="" disabled selected>
              Select a project...
            </option>
            <option value="Project 1" selected={this.card && this.card.project === 'Project 1'}>
              Projeto 1
            </option>
            <option value="Project 2" selected={this.card && this.card.project === 'Project 2'}>
              Projeto 2
            </option>
            <option value="Project 3" selected={this.card && this.card.project === 'Project 3'}>
              Projeto 3
            </option>
          </select>
        </div>
        <div class="mb-4 col-span-1">
          <label htmlFor="priority" class="block mb-2 text-sm font-medium text-gray-900">
            Priority
          </label>
          <select
            name="priority"
            id="priority"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            onInput={e => this.handlePriority(e)}
          >
            <option value="" disabled selected>
              Select a priority...
            </option>
            <option value="high" selected={this.card && this.card.priority === 'high'}>
              High
            </option>
            <option value="medium" selected={this.card && this.card.priority === 'medium'}>
              Medium
            </option>
            <option value="low" selected={this.card && this.card.priority === 'low'}>
              Low
            </option>
          </select>
        </div>
        <div class="mb-4 col-span-1">
          <label htmlFor="date" class="block mb-2 text-sm font-medium text-gray-900">
            Date
          </label>
          <input
            onInput={e => this.handleDate(e)}
            type="date"
            id="date"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="name@flowbite.com"
            required
            value={this.card && this.card.date}
          />
        </div>
        <button
          type="submit"
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          SAVE
        </button>
      </form>
    );
  }
}
