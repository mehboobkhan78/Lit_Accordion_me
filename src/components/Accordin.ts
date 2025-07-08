import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

interface AccordionItem {
  id: number;
  label: string;
  open: boolean;
}

@customElement('custom-accordion')
export class CustomAccordion extends LitElement {
  @property({ type: Boolean }) interactive = true;
  @property({ type: Boolean }) showCheckBox = true;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) showSecondaryText = true;

  @state()
  private items: AccordionItem[] = [
    { id: 1, label: 'Level 1', open: false },
    { id: 2, label: 'Level 1', open: false },
    { id: 3, label: 'Level 1', open: false },
  ];

  private zoomLevel = 1;

  private zoomIn() {
    this.zoomLevel += 0.1;
    this.updateZoom();
  }

  private zoomOut() {
    this.zoomLevel = Math.max(0.5, this.zoomLevel - 0.1);
    this.updateZoom();
  }

  private refresh() {
    this.zoomLevel = 1;
    this.updateZoom();
  }

  private updateZoom() {
    const wrapper = this.renderRoot.querySelector('.outer-box') as HTMLElement;
    if (wrapper) {
      wrapper.style.transform = `scale(${this.zoomLevel})`;
      wrapper.style.transformOrigin = 'top left';
    }
  }

  private toggleItem(id: number) {
    if (this.disabled) return;
    this.items = this.items.map((item) =>
      item.id === id ? { ...item, open: !item.open } : { ...item, open: false }
    );
  }

  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      background-color: white;
    }

    h1 {
      margin-left: 16px;
    }

    .outer-box {
      border: 1px solid #ccc;
      border-radius:2px;
      margin: 16px;
      background: white;
      padding: 0;
      overflow: hidden;
    }

    .toolbar-container {
      display: flex;
      gap: 8px;
      padding: 12px 16px;
      align-items: center;
      background-color: white;
    }

    .toolbar-container button {
      background: white;
      border: 1px solid white;
      border-radius: 4px;
      padding: 6px 10px;
      cursor: pointer;
      font-size: 16px;
      transition: all 0.2s ease;
    }

    .toolbar-container button:hover {
      background-color: #fafafa;
      border-color: #aaa;
    }

    .divider {
      border-top: 1px solid #ddd;
      margin: 0;
    }

    .inner-wrapper {
      padding: 24px;
      margin: 30px;
      transition: transform 0.2s ease-in-out;
      border: 1px solid #ccc;
      border-radius: 3px;
      background-color: white;
    }

    .accordion-item {
      border-top:0px;
      margin: 0;
      padding: 0;
    }

    .accordion-item:first-child {
      border-top: none;
    }

    .accordion-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      cursor: pointer;
      background: white;
      transition: background 0.2s ease;
    }

    .accordion-header:hover {
      background-color: #f9f9f9;
    }

    .accordion-content {
      padding: 24px;
      background-color:rgba(225, 188, 241, 0.7);
      border: 2px dotted rgb(155, 74, 161);
      display: flex;
      justify-content: center;
      align-items: center;
      color:rgb(221, 116, 212);
      font-weight: 500;
      font-size: 14px;
      min-height: 100px;
      text-align: center;
      flex-direction: column;
      margin: 20px;
    }

    .checkbox {
      margin-right: 8px;
    }

    .label-group {
      display: flex;
      align-items: center;
      flex-grow: 1;
    }

    .label-column {
      display: flex;
      flex-direction: column;
      line-height: 1.2;
    }

    .secondary-text {
      color: #888;
      font-size: 12px;
    }

   .arrow {
  padding: 4px 6px;
  border-radius: 4px; /* square */
  transition: transform 0.2s ease, border 0.2s ease, background-color 0.2s ease;
  border: 1px solid transparent;
}

.arrow.open {
  transform: rotate(180deg);
  border: 1px solid #888; /* darker border on open */
  background-color: #eee;  /* slightly darker background */
}

  `;

  render() {
    return html`
      <h1>Accordion</h1>
      <div class="outer-box">
        <div class="toolbar-container">
          <button @click=${this.zoomIn}>🔍</button>
          <button @click=${this.zoomOut}>🔎</button>
          <button @click=${this.refresh}>🔄</button>
        </div>
        <hr class="divider" />
        <div class="inner-wrapper">
          ${this.items.map(
            (item) => html`
              <div class="accordion-item ${this.disabled ? 'disabled' : ''}">
                <div class="accordion-header" @click=${() => this.toggleItem(item.id)}>
                  <div class="label-group">
                    ${this.showCheckBox
                      ? html`<input type="checkbox" class="checkbox" ?disabled=${this.disabled} />`
                      : null}
                    <div class="label-column">
                      <span>${item.label}</span>
                      ${this.showSecondaryText
                        ? html`<span class="secondary-text">Optional</span>`
                        : ''}
                    </div>
                  </div>
                  <span class="arrow ${item.open ? 'open' : ''}">⌄</span>
                </div>
                ${item.open
                  ? html`
                      <div class="accordion-content">
                        <div class="content-box">
                          <span style="font-size: 24px;">📄</span>
                          <div>Replace me</div>
                        </div>
                      </div>
                    `
                  : null}
              </div>
            `
          )}
        </div>
      </div>
    `;
  }
}
