/**
 * Accessibility utilities for keyboard navigation, focus management, and screen reader support
 */

/**
 * Announce message to screen readers via ARIA live region
 * @param {string} message - Message to announce
 * @param {string} priority - 'polite' or 'assertive'
 */
function announceToScreenReader(message, priority = 'polite') {
  let liveRegion = document.getElementById('aria-live-region');
  
  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.id = 'aria-live-region';
    liveRegion.className = 'sr-only';
    liveRegion.setAttribute('aria-live', priority);
    liveRegion.setAttribute('aria-atomic', 'true');
    document.body.appendChild(liveRegion);
  }
  
  // Clear and set new message
  liveRegion.textContent = '';
  setTimeout(() => {
    liveRegion.textContent = message;
  }, 100);
}

/**
 * Trap focus within a modal or dialog
 * @param {HTMLElement} container - Container element
 */
function trapFocus(container) {
  const focusableElements = container.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];
  
  container.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
    
    if (e.key === 'Escape') {
      // Close dialog on Escape
      const closeButton = container.querySelector('[data-close-dialog]');
      if (closeButton) {
        closeButton.click();
      }
    }
  });
  
  // Focus first element
  if (firstFocusable) {
    firstFocusable.focus();
  }
}

/**
 * Create a keyboard-accessible list with arrow navigation
 * @param {HTMLElement} list - List element (ul or ol)
 * @param {Function} onSelect - Callback when item is selected
 */
function makeListKeyboardAccessible(list, onSelect) {
  const items = Array.from(list.querySelectorAll('li, [role="listitem"]'));
  
  items.forEach((item, index) => {
    // Make items focusable
    if (!item.hasAttribute('tabindex')) {
      item.setAttribute('tabindex', index === 0 ? '0' : '-1');
    }
    
    item.addEventListener('keydown', (e) => {
      let handled = false;
      
      switch (e.key) {
        case 'ArrowDown':
          if (index < items.length - 1) {
            items[index + 1].focus();
            handled = true;
          }
          break;
          
        case 'ArrowUp':
          if (index > 0) {
            items[index - 1].focus();
            handled = true;
          }
          break;
          
        case 'Home':
          items[0].focus();
          handled = true;
          break;
          
        case 'End':
          items[items.length - 1].focus();
          handled = true;
          break;
          
        case 'Enter':
        case ' ':
          if (onSelect) {
            onSelect(item, index);
            handled = true;
          }
          break;
      }
      
      if (handled) {
        e.preventDefault();
      }
    });
    
    item.addEventListener('focus', () => {
      // Update tabindex
      items.forEach(i => i.setAttribute('tabindex', '-1'));
      item.setAttribute('tabindex', '0');
    });
  });
}

/**
 * Create skip navigation link
 * @param {string} targetId - ID of main content element
 * @returns {HTMLElement} Skip link element
 */
function createSkipLink(targetId = 'main-content') {
  const skipLink = document.createElement('a');
  skipLink.href = `#${targetId}`;
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Skip to main content';
  
  skipLink.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
  
  return skipLink;
}

/**
 * Enhanced button that announces state changes
 * @param {HTMLButtonElement} button
 * @param {string} action - Description of action
 */
function makeButtonAnnounced(button, action) {
  button.addEventListener('click', () => {
    announceToScreenReader(`${action} activated`);
  });
}

/**
 * Create accessible toggle button
 * @param {string} id - Button ID
 * @param {string} label - Button label
 * @param {boolean} initialState - Initial pressed state
 * @param {Function} onChange - Callback when state changes
 * @returns {HTMLButtonElement}
 */
function createToggleButton(id, label, initialState, onChange) {
  const button = document.createElement('button');
  button.id = id;
  button.type = 'button';
  button.className = 'toggle-button';
  button.setAttribute('aria-pressed', initialState.toString());
  button.textContent = label;
  
  button.addEventListener('click', () => {
    const newState = button.getAttribute('aria-pressed') === 'false';
    button.setAttribute('aria-pressed', newState.toString());
    
    const stateText = newState ? 'on' : 'off';
    announceToScreenReader(`${label} ${stateText}`);
    
    if (onChange) {
      onChange(newState);
    }
  });
  
  return button;
}

/**
 * Create accessible checkbox with label
 * @param {string} id - Checkbox ID
 * @param {string} label - Label text
 * @param {boolean} checked - Initial checked state
 * @param {Function} onChange - Callback when state changes
 * @returns {HTMLElement} Container with checkbox and label
 */
function createCheckbox(id, label, checked, onChange) {
  const container = document.createElement('div');
  container.className = 'checkbox-container';
  
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = id;
  checkbox.checked = checked;
  checkbox.className = 'checkbox';
  
  const labelEl = document.createElement('label');
  labelEl.htmlFor = id;
  labelEl.textContent = label;
  
  checkbox.addEventListener('change', (e) => {
    const stateText = e.target.checked ? 'checked' : 'unchecked';
    announceToScreenReader(`${label} ${stateText}`);
    
    if (onChange) {
      onChange(e.target.checked);
    }
  });
  
  container.appendChild(checkbox);
  container.appendChild(labelEl);
  
  return container;
}

/**
 * Manage focus restoration when modals close
 */
class FocusManager {
  constructor() {
    this.focusHistory = [];
  }
  
  saveFocus() {
    this.focusHistory.push(document.activeElement);
  }
  
  restoreFocus() {
    const lastFocus = this.focusHistory.pop();
    if (lastFocus && lastFocus.focus) {
      lastFocus.focus();
    }
  }
}

const focusManager = new FocusManager();

/**
 * Create accessible modal dialog
 * @param {string} id - Dialog ID
 * @param {string} title - Dialog title
 * @param {string} content - Dialog content HTML
 * @returns {HTMLElement} Dialog element
 */
function createDialog(id, title, content) {
  const dialog = document.createElement('div');
  dialog.id = id;
  dialog.className = 'dialog-overlay';
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-labelledby', `${id}-title`);
  dialog.setAttribute('aria-modal', 'true');
  dialog.style.display = 'none';
  
  dialog.innerHTML = `
    <div class="dialog-content">
      <div class="dialog-header">
        <h2 id="${id}-title">${title}</h2>
        <button class="dialog-close" data-close-dialog aria-label="Close dialog">
          ×
        </button>
      </div>
      <div class="dialog-body">
        ${content}
      </div>
    </div>
  `;
  
  // Close on backdrop click
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) {
      closeDialog(id);
    }
  });
  
  // Close button
  const closeButton = dialog.querySelector('[data-close-dialog]');
  closeButton.addEventListener('click', () => closeDialog(id));
  
  return dialog;
}

/**
 * Open dialog
 * @param {string} dialogId - Dialog ID
 */
function openDialog(dialogId) {
  const dialog = document.getElementById(dialogId);
  if (!dialog) return;
  
  focusManager.saveFocus();
  dialog.style.display = 'flex';
  trapFocus(dialog.querySelector('.dialog-content'));
  announceToScreenReader('Dialog opened');
}

/**
 * Close dialog
 * @param {string} dialogId - Dialog ID
 */
function closeDialog(dialogId) {
  const dialog = document.getElementById(dialogId);
  if (!dialog) return;
  
  dialog.style.display = 'none';
  focusManager.restoreFocus();
  announceToScreenReader('Dialog closed');
}

/**
 * Initialize keyboard shortcuts
 * @param {Object} shortcuts - Map of key combinations to handlers
 */
function initKeyboardShortcuts(shortcuts) {
  document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    const combo = [
      e.ctrlKey && 'ctrl',
      e.shiftKey && 'shift',
      e.altKey && 'alt',
      e.metaKey && 'meta',
      key
    ].filter(Boolean).join('+');
    
    if (shortcuts[combo]) {
      e.preventDefault();
      shortcuts[combo]();
    }
  });
}

/**
 * Ensure minimum color contrast (simplified check)
 * @param {string} foreground - Foreground color (hex)
 * @param {string} background - Background color (hex)
 * @returns {number} Contrast ratio
 */
function getContrastRatio(foreground, background) {
  // Simplified - in production use proper color library
  const getLuminance = (hex) => {
    const rgb = parseInt(hex.slice(1), 16);
    const r = ((rgb >> 16) & 0xff) / 255;
    const g = ((rgb >> 8) & 0xff) / 255;
    const b = (rgb & 0xff) / 255;
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  
  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Initialize accessibility features on page load
 */
function initAccessibility() {
  // Add skip link
  const skipLink = createSkipLink();
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Create ARIA live region
  announceToScreenReader('Page loaded');
  
  // Add focus visible polyfill for older browsers
  document.body.addEventListener('mousedown', () => {
    document.body.classList.add('using-mouse');
  });
  
  document.body.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.remove('using-mouse');
    }
  });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAccessibility);
} else {
  initAccessibility();
}
