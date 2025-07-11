import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

interface AccordionItem {
  id: number;
  label: string;
  open: boolean;
}

@customElement("dx-accordion")
export class CustomAccordion extends LitElement {
  @property({ type: Boolean }) showCheckbox = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) showSecondaryText = false;
  @property({ type: String }) type: 'outlined' | 'no-outline' = 'outlined';

  @state()
  private items: AccordionItem[] = [
    { id: 1, label: 'Level 1', open: false },
    { id: 2, label: 'Level 1', open: false },
    { id: 3, label: 'Level 1', open: false },
  ];

  private toggleItem(id: number) {
    if (this.disabled) return;
    this.items = this.items.map(item =>
      item.id === id ? { ...item, open: !item.open } : item
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

    .accordion-item {
      border: 1px solid black;
      border-radius: 4px;
      margin: 0px;
      overflow: hidden;
    }

    .accordion-item.no-outline {
      border: none;
      box-shadow: none;
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
      padding: 16px;
      background-color: rgba(225, 188, 241, 0.7);
      border: 2px dotted rgb(155, 74, 161);
      display: flex;
      justify-content: center;
      align-items: center;
      color: rgb(221, 116, 212);
      font-weight: 500;
      font-size: 14px;
      min-height: 50px;
      text-align: center;
      flex-direction: column;
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
    }

    .secondary-text {
      color: #888;
      font-size: 12px;
    }

    .arrow {
      padding: 4px 6px;
      border-radius: 4px;
      transition: transform 0.3s ease, border 0.2s ease, background-color 0.2s ease;
      border: 1px solid transparent;
    }

    .arrow.open {
      transform: rotate(180deg);
      border: 1px solid #888;
      background-color: #eee;
    }
  `;

  render() {
    return html`
      <h1>Accordion</h1>
      ${this.items.map(item => html`
        <div
          class="accordion-item
          ${this.disabled ? 'disabled' : ''}
          ${this.type === 'no-outline' ? 'no-outline' : ''}">
          
          <div class="accordion-header" @click=${() => this.toggleItem(item.id)}>
            <div class="label-group">
              ${this.showCheckbox
                ? html`<input type="checkbox" class="checkbox" ?disabled=${this.disabled} />`
                : null}
              
              <div class="label-column">
                <span>${item.label}</span>
                ${this.showSecondaryText
                  ? html`<span class="secondary-text">Optional</span>`
                  : ''}
              </div>
            </div>

            <span class="arrow ${item.open ? 'open' : ''}">&#9660;</span>
          </div>

          ${item.open ? html`
            <div class="accordion-content">
              <div class="content-box">
                <span style="font-size: 24px;">&#128257;</span>
              </div>
            </div>
          ` : ''}
        </div>
      `)}
    `;
  }
}
