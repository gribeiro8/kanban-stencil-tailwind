import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'modal-box',
  styleUrl: 'modal.css',
  shadow: true,
})
export class Modal {
  @Prop({
    mutable: true,
  })
  public visible: boolean;
  @Prop() titleHeader: string;
  @Prop() closeFunction: () => void;

  handleClose = () => {
    this.closeFunction();
  };

  render() {
    return (
      <div class={this.visible ? 'visible' : 'invisible'}>
        <div class="relative z-10  " aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div class="fixed inset-0 z-10 overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div class="bg-gray-50 px-4 py-3 flex justify-between">
                  <h3>{this.titleHeader}</h3>
                  <span class="cursor-pointer" onClick={() => this.handleClose()}>
                    X
                  </span>
                </div>
                <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <slot />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
