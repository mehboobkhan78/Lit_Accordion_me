import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from '../styles/frustate.scss' assert { type: 'css' };

@customElement('frustate-accordion')
export class CustomAccordion extends LitElement {
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) showcheckbox = false;
  @property({ type: Boolean, reflect: true }) showsecondarytext = false;
  @property({ type: String, reflect: true }) type: 'outline' | '' = '';
  @property({ type: Boolean, reflect: true }) open = false;

  static styles = [styles];

  toggleAccordion() {
    if (!this.disabled) {
      this.open = !this.open;
    }
  }

  render() {
    return html`
      <div id="accordion ${this.type}" part="accordion">
        <div
          id="accordion-header ${this.disabled ? 'disabled' : ''}"
          part="header"
          @click=${this.toggleAccordion}
        >
          <div id="header-left" part="headerleft">
            ${this.showcheckbox
              ? html`<input type="checkbox" ?disabled=${this.disabled} part="checkbox" />`
              : null}

            <div id="label-column" part="labelcolumn">
              <slot name="header" part="header-slot">Accordion Title</slot>
              ${this.showsecondarytext
                ? html`<div class="secondary-text" part="secondary-text">(Optional)</div>`
                : null}
            </div>
          </div>

          <span id="arrow ${this.open ? 'open' : ''}" part="arrow">&#9660;</span>
        </div>

        <div id="accordion-content ${this.open ? 'open' : ''}" part="content">
          <slot name="content" part="content-slot">Accordion Content Goes Here...</slot>
        </div>
      </div>
    `;
  }
}
