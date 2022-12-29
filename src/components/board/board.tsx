import { Component, h, State } from '@stencil/core';
import { verifyObject } from '../../utils/utils';
import { CARDS, TABLE_COLS } from './data';
import { ICard } from './types';

@Component({
  tag: 'board-kanban',
  styleUrl: 'board.css',
  shadow: true,
})
export class Board {
  constructor() {
    this.handleChangeColumn = this.handleChangeColumn.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdateCard = this.handleUpdateCard.bind(this);
  }

  @State() visible: boolean = false;
  @State() visibleView: boolean = false;
  @State() cards: ICard[] = CARDS;
  @State() card: any;

  @State() selectedCol: number;

  handleModal(selectedCol: null | number = null) {
    if (this.visible == true && verifyObject(this.card)) {
      this.card = {};
    }
    this.visible = !this.visible;
    this.selectedCol = selectedCol;
  }

  handleModalView(task = null) {
    this.visibleView = !this.visibleView;
    this.card = task !== null ? task : {};
  }

  handleUpdateCard(updatedCard, type) {
    if (type === 'edit') {
      Object.assign(
        this.cards.find(b => b.id === this.card.id),
        { ...updatedCard },
      );
    } else {
      this.cards.push(updatedCard);
    }
    console.log(this.cards);

    this.handleModal();
  }

  handleChangeColumn(idCard: number = null, newColumn: number = null) {
    Object.assign(
      this.cards.find(b => b.id === idCard),
      { colId: newColumn },
    );
    this.handleModalView();
  }

  handleDelete(idCard) {
    this.cards = this.cards.filter(function (card) {
      return card.id !== idCard;
    });
    this.handleModalView();
  }

  handleEdit(card) {
    this.handleModalView(card);
    this.handleModal();
  }

  render() {
    return (
      <div class="relative bg-gray-50 min-h-screen w-full">
        <div class="container mx-auto ">
          <div class="flex flex-row justify-between pt-10">
            <h1 class="text-xl text-gray-800 font-bold">Tasks</h1>
            <select class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" name="" id="">
              <option value="">All Projects</option>
            </select>
          </div>

          <div class="grid grid-cols-3 gap-12 mt-5">
            {TABLE_COLS.map(table => {
              const cards = this.cards && this.cards.filter(card => card.colId === table.id);
              return (
                <div class="col-span-1">
                  <p class="uppercase">
                    {table.name} <button onClick={() => this.handleModal(table.id)}>+</button>
                  </p>
                  {cards.map(card => {
                    return (
                      <card-kanban onClick={() => this.handleModalView(card)} titled={card.title} priority={card.priority} project={card.project} date={card.date}></card-kanban>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <modal-box visible={this.visible} titleHeader={this.card != null ? 'Edit Task' : 'Add Task'} closeFunction={() => this.handleModal()}>
          <form-task card={this.card} selectedCol={this.selectedCol} handleUpdateCard={this.handleUpdateCard}></form-task>
        </modal-box>
        <modal-box visible={this.visibleView} titleHeader="Task" closeFunction={() => this.handleModalView()}>
          {this.card && (
            <view-task
              titled={this.card.title}
              date={this.card.date}
              priority={this.card.priority}
              project={this.card.project}
              cod={this.card.id}
              editTask={this.handleEdit}
              deleteTask={this.handleDelete}
              handleChangeColumn={this.handleChangeColumn}
            ></view-task>
          )}
        </modal-box>
      </div>
    );
  }
}
