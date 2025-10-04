document.addEventListener("DOMContentLoaded", () => {
  const scriptTag = document.currentScript || document.querySelector('script[src*="products.js"]');
  const productsFile = scriptTag.getAttribute('data-products') || 'assets/json/products.json';

  fetch(productsFile)
    .then(res => res.json())
    .then(products => {
      const grid = document.querySelector('.products-grid');
      if (!grid) return;

      // Modal elements
      const modal = document.getElementById('product-modal');
      const modalBody = modal.querySelector('.product-modal-body');
      const modalClose = modal.querySelector('.product-modal-close');

      Object.values(products).forEach(product => {
        if(product.onStock){
          const tile = document.createElement('div');
          tile.className = 'product-tile';
          tile.tabIndex = 0; // Make tile focusable for accessibility

          // Images carousel or just first image
          let imagesHtml = '';
          if (product.imgs && product.imgs.length > 0) {
            imagesHtml = `
              <div class="product-images">
                <img src="${product.imgs[0].img}" alt="${product.imgs[0].alt || product.name}">
              </div>
            `;
          }

          tile.innerHTML = `
            ${imagesHtml}
            <div class="product-title">${product.name || ''}</div>
            <div class="product-cost">${product.cost || ''}</div>
            <div class="product-collection">${product.collection || ''}</div>
            <div class="product-shortdesc">${product.shortDescription || ''}</div>
          `;

          // Show modal on tile click
          tile.addEventListener('click', () => {
            let allImagesHtml = '';
            if (product.imgs && product.imgs.length > 0) {
              allImagesHtml = product.imgs.map(imgObj =>
                `<img src="${imgObj.img}" alt="${imgObj.alt || product.name}">`
              ).join('');
            }
            modalBody.innerHTML = `
              <div class="product-title">${product.shortName || ''}</div>
              <div class="product-shortDescription">${product.shortDescription || ''}</div>
              <div class="product-images">${allImagesHtml}</div>
              <div class="product-description">${product.description || ''}</div>
              <div class="product-type"><strong>${product.type || ''}</strong></div>
              <div class="product-use"><strong>Modo de uso:</strong></div>
              <div class="product-usemode">${product.useMode || ''}</div>
            `;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent background scroll
          });
          grid.appendChild(tile);
        }
      });
      // Close modal on X click or background click
      modalClose.addEventListener('click', closeModal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
      function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
      // Optional: close modal on ESC key
      document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'flex' && e.key === 'Escape') closeModal();
      });
    })
    .catch(err => {
      console.error("Error loading products:", err);
    });
});