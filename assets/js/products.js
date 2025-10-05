document.addEventListener("DOMContentLoaded", () => {
  const scriptTag = document.currentScript || document.querySelector('script[src*="products.js"]');
  const productsFile = scriptTag.getAttribute('data-products') || 'assets/json/products.json';

  let allProducts = []; // Keep all products in memory

  fetch(productsFile)
    .then(res => res.json())
    .then(products => {
      allProducts = products; // Store all products
      renderProducts(allProducts);

      // Setup search
      const searchInput = document.getElementById('product-search');
      if (searchInput) {
        searchInput.addEventListener('input', function () {
          const query = this.value.trim().toLowerCase();
          // Filter products by name, shortName, shortDescription, description, collection, type
          const filtered = allProducts.filter(product => {
            if (!product.onStock) return false;
            const fields = [
              product.name,
              product.shortName,
              product.shortDescription,
              product.description,
              product.collection,
              product.type
            ];
            return fields.some(field =>
              field && field.toLowerCase().includes(query)
            );
          });
          renderProducts(filtered);
        });
      }
    })
    .catch(err => {
      console.error("Error loading products:", err);
    });

  function renderProducts(productsToShow) {
    const grid = document.querySelector('.products-grid');
    if (!grid) return;
    grid.innerHTML = ""; // Clear previous

    // Modal elements
    const modal = document.getElementById('product-modal');
    const modalBody = modal.querySelector('.product-modal-body');
    const modalClose = modal.querySelector('.product-modal-close');

    productsToShow.forEach(product => {
      if(product.onStock){
        const tile = document.createElement('div');
        tile.className = 'product-tile';
        tile.tabIndex = 0;

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
          <div class="product-collection">${product.collection || ''}</div>
          <div class="product-cost">${product.cost || ''}</div>
        `;

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
          document.body.style.overflow = 'hidden';
        });
        grid.appendChild(tile);
      }
    });

    // Modal close logic (keep only one set of listeners)
    if (modal && modalClose && !modalClose.hasListener) {
      modalClose.addEventListener('click', closeModal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
      document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'flex' && e.key === 'Escape') closeModal();
      });
      modalClose.hasListener = true;
    }
    function closeModal() {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }
});