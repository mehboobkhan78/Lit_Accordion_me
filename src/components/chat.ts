import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

interface AccordionItem {
  id: number;
  label: string;
  open: boolean;
  inputValue?: string; // for user input
}

@customElement("chat-accordion")
export class CustomAccordion extends LitElement {
  @property({ type: Boolean }) showCheckbox = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) showSecondaryText = false;
  @property({ type: String }) type: 'outlined' | 'no-outline' = 'outlined';

  @state()
  private items: AccordionItem[] = [];

  private idCounter = 1;

  private toggleItem(id: number) {
    if (this.disabled) return;
    this.items = this.items.map(item =>
      item.id === id ? { ...item, open: !item.open } : item
    );
  }

  private addItem() {
    const newItem: AccordionItem = {
      id: this.idCounter++,
      label: `Level ${this.items.length + 1}`,
      open: false,
      inputValue: ''
    };
    this.items = [...this.items, newItem];
  }

  private updateInputValue(id: number, value: string) {
    this.items = this.items.map(item =>
      item.id === id ? { ...item, inputValue: value } : item
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
      margin: 8px 16px;
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
      flex-direction: column;
      gap: 12px;
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
      transition: transform 0.3s ease;
    }

    .arrow.open {
      transform: rotate(180deg);
    }

    .add-button {
      margin: 16px;
      padding: 8px 12px;
      font-size: 14px;
      border-radius: 4px;
      background-color: #7e57c2;
      color: white;
      border: none;
      cursor: pointer;
    }

    .add-button:hover {
      background-color: #5e35b1;
    }

    input[type="text"] {
      padding: 8px;
      font-size: 14px;
      border-radius: 4px;
      border: 1px solid #ccc;
      width: 100%;
    }
  `;

  render() {
    return html`
      <h1>Accordion</h1>

      <button class="add-button" @click=${this.addItem}>+ Add Accordion Item</button>

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
              <label>Enter your value for this section:</label>
              <input 
                type="text" 
                .value=${item.inputValue || ''} 
                @input=${(e: Event) => this.updateInputValue(item.id, (e.target as HTMLInputElement).value)}
              />
              <span><strong>Entered:</strong> ${item.inputValue}</span>
            </div>
          ` : ''}
        </div>
      `)}
    `;
  }
}
