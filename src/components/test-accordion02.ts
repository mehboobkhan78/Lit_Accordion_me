import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
// Remove the problematic import and use the standard Lit css import below
// import "../styles/test-accordion02.scss";
import styles from '../styles/test-accordion02.scss' assert { type: 'css' };


@customElement('test-accordion02')
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
      <div class="accordion ${this.type}" part="accordion">
        <div
          class="accordion-header ${this.disabled ? 'disabled' : ''}"
          part="header"
          @click="${this.toggleAccordion}"
        >
          <div class="header-left" part="header-left">
            ${this.showcheckbox
              ? html`<input type="checkbox" ?disabled=${this.disabled} part="checkbox" />`
              : null}

            <div class="label-column" part="label-column">
              <slot name="header" part="header-slot">Accordion Title</slot>
              ${this.showsecondarytext
                ? html`<div class="secondary-text" part="secondary-text">(Optional)</div>`
                : null}
            </div>
          </div>

          <span class="arrow ${this.open ? 'open' : ''}" part="arrow">&#9660;</span>
        </div>

        <div class="accordion-content ${this.open ? 'open' : ''}" part="content">
          <slot name="content" part="content-slot">Accordion Content Goes Here...</slot>
        </div>
      </div>
    `;
  }
}
