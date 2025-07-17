import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DxAccordionSummary } from './dx-accordion-summary';
import styles from '../styles/dx-accordion.scss' assert { type: 'css' };
// import { DxAcBaseElement } from './dx-ac-base-element';

@customElement('dx-accordion')
export class DxAccordion extends LitElement {
  @property({ type: Boolean, reflect: true }) showCheckbox = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) showSecondaryText = false;
  @property({ type: String }) type: 'outlined' | 'no-outline' = 'outlined';
  @property({ type: Boolean }) open = false;

  toggleAccordion() {
    if (!this.disabled) {
      this.open = !this.open;
    }
  }

  static styles = [styles];



  render() {
    return html`
      <div class="accordion ${this.type}" part="accordion">
          <p> This is part based CSS styling</p>
      </div>
    `;
  }

  handleSlotChange() {
    this.requestUpdate(); // trigger re-render if needed
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dx-accordion': DxAccordion;
   // 'dx-accordion-summary': DxAccordionSummary;
  }
}
