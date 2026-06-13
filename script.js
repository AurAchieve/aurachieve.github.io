console.log("Aura theme loaded.");

// Modal Logic
document.addEventListener('DOMContentLoaded', () => {
    const tryNowBtn = document.getElementById('try-now-btn');
    const modal = document.getElementById('beta-modal');
    const closeBtn = document.querySelector('.modal-close');
    let lastFocusedElement = null;

    const getFocusableElements = () => {
        if (!modal) {
            return [];
        }

        return Array.from(modal.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'));
    };

    const openModal = () => {
        if (!modal) {
            return;
        }

        lastFocusedElement = document.activeElement;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');

        const focusableElements = getFocusableElements();
        const initialFocus = focusableElements.find((element) => element === closeBtn) || focusableElements[0];
        window.setTimeout(() => {
            initialFocus?.focus();
        }, 0);
    };

    const closeModal = () => {
        if (!modal) {
            return;
        }

        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');

        if (lastFocusedElement instanceof HTMLElement) {
            lastFocusedElement.focus();
        }
    };

    if (tryNowBtn && modal && closeBtn) {
        tryNowBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });

        closeBtn.addEventListener('click', () => {
            closeModal();
        });

        // Close on click outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (!modal.classList.contains('active')) {
                return;
            }

            if (e.key === 'Escape') {
                closeModal();
                return;
            }

            if (e.key === 'Tab') {
                const focusableElements = getFocusableElements();

                if (focusableElements.length === 0) {
                    return;
                }

                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        });
    }
});
