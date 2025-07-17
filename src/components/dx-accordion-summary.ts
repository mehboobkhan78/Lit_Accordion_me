import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
// import { DxAcBaseElement } from './dx-ac-base-element';
import { DxAccordion } from './dx-accordion';

@customElement('dx-accordion-summary')
export class DxAccordionSummary extends DxAccordion {
  @property({ type: String }) label = '';
  @property({ type: String }) secondaryText = '';

  static styles = css`
    .summary {
      border-top: 1px solid #ddd;
      padding: 12px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      transition: background 0.3s ease;
    }

    .summary:hover {
      background: #f5f5f5;
    }

    .label {
      font-weight: bold;
    }

    .secondary {
      font-size: 0.9em;
      color: #666;
    }
  `;

  render() {
    return html`
      <div class="summary">
        <div class="label">${this.label}</div>
        ${this.secondaryText
          ? html`<div class="secondary">${this.secondaryText}</div>`
          : null}
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dx-accordion': DxAccordion;
    'dx-accordion-summary': DxAccordionSummary;
  }
}
