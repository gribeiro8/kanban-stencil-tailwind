import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'card-kanban',
  styleUrl: 'card.css',
  shadow: true,
})
export class Card {
  /**
   * The data card
   */
  @Prop() titled: string;
  @Prop() project: string;
  @Prop() date: string;
  @Prop() priority: 'high' | 'medium' | 'low';

  render() {
    return (
      <div class="bg-white p-4 mt-5 mb-4 rounded-lg shadow-sm cursor-pointer">
        <div class="flex flex-row justify-between">
          <p class="text-base text-gray-400">{this.project}</p>
          <p class="text-sm text-gray-300">{this.date}</p>
        </div>
        <div class="flex flex-row justify-between mt-3">
          <p class="text-xl text-bold text-gray-800">{this.titled}</p>
          <p class="text-sm">{this.priority}</p>
        </div>
        <div class="flex flex-row justify-between mt-3">
          <p class="text-sm text-gray-400">
            Addigned <br />
            Users
          </p>
          <div class="flex flex-row">
            <p class="p-3 rounded-full bg-indigo-600 text-white ml-2">GR</p>
          </div>
        </div>
      </div>
    );
  }
}
