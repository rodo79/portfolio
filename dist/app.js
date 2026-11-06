document.documentElement.classList.add('js');

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach(element => element.classList.add('is-visible'));
}

const projectDialog = document.querySelector('#project-dialog');
const projectBody = document.querySelector('#project-body');
let returnFocus = null;
const dialogs = [...document.querySelectorAll('dialog')];

function openDialog(dialog, trigger) {
  returnFocus = trigger;
  dialog.showModal();
  document.body.style.overflow = 'hidden';
}

function closeDialog(dialog) { dialog.close(); }
dialogs.forEach(dialog => {
  dialog.querySelector('.close-dialog').addEventListener('click', () => closeDialog(dialog));
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) closeDialog(dialog);
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = '';
    returnFocus?.focus({ preventScroll: true });
  });
});

document.querySelectorAll('[data-project]').forEach(button => {
  button.addEventListener('click', event => {
    const template = document.getElementById(`detail-${button.dataset.project}`);
    if (!template) return;
    event.preventDefault();
    projectBody.replaceChildren(template.content.cloneNode(true));
    openDialog(projectDialog, button);
  });
});

const galleryDialog = document.querySelector('#gallery-dialog');
const galleryImage = document.querySelector('#gallery-image');
const galleryCounter = document.querySelector('#gallery-counter');
const galleryItems = [...document.querySelectorAll('[data-gallery]')];
let galleryIndex = 0;

function showImage(index) {
  galleryIndex = (index + galleryItems.length) % galleryItems.length;
  const item = galleryItems[galleryIndex];
  galleryImage.src = item.dataset.full;
  galleryImage.alt = item.querySelector('img').alt;
  galleryCounter.textContent = `${item.dataset.caption} · ${galleryIndex + 1} / ${galleryItems.length}`;
}

const galleryZoom = document.querySelector('#gallery-zoom');
galleryZoom.addEventListener('click', () => {
  const zoomed = galleryDialog.classList.toggle('is-zoomed');
  galleryZoom.setAttribute('aria-pressed', String(zoomed));
  galleryZoom.textContent = zoomed ? galleryZoom.dataset.fit : galleryZoom.dataset.zoom;
});

galleryItems.forEach((button, index) => {
  button.addEventListener('click', event => {
    event.preventDefault();
    showImage(index);
    openDialog(galleryDialog, button);
  });
});
document.querySelector('#gallery-prev').addEventListener('click', () => showImage(galleryIndex - 1));
document.querySelector('#gallery-next').addEventListener('click', () => showImage(galleryIndex + 1));
galleryDialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    showImage(galleryIndex + (event.key === 'ArrowLeft' ? -1 : 1));
  }
  if (event.key === 'Home' || event.key === 'End') {
    event.preventDefault();
    showImage(event.key === 'Home' ? 0 : galleryItems.length - 1);
  }
});

document.querySelectorAll('[data-energy-select]').forEach(button => {
  button.addEventListener('click', () => {
    const figure = button.closest('[data-energy-mode]');
    const mode = button.dataset.energySelect;
    figure.dataset.energyMode = mode;
    figure.querySelectorAll('[data-energy-select]').forEach(control => {
      control.setAttribute('aria-pressed', String(control === button));
    });
    const status = figure.querySelector('.energy-status');
    status.textContent = status.dataset[mode];
  });
});

// Language is part of the URL, so each version works without JavaScript.
