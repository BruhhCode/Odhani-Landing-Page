// Odhani — landing page interactions
(async function () {
  const data = await fetch('content.json').then(r => r.json());

  // Nav links
  document.getElementById('navLinks').innerHTML = data.nav
    .map(l => `<li><a href="#${l.toLowerCase().replace(/\s+/g, '-')}">${l}</a></li>`).join('');

  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav-toggle');
  navToggle?.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });
  document.querySelectorAll('#navLinks a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });

  // Collections
  document.getElementById('collGrid').innerHTML = data.collections.map(c => `
    <a href="#shop" class="coll-card">
      <div class="img-wrap"><img loading="lazy" src="${c.img}" alt="${c.title}"/></div>
      <div class="coll-overlay"></div>
      <div class="coll-text">
        <h3>${c.title}</h3>
        <p>${c.desc}</p>
        <span class="more">Explore →</span>
      </div>
    </a>
  `).join('');

  // Why
  document.getElementById('whyGrid').innerHTML = data.features.map((f, i) => `
    <div class="why-item">
      <span class="num">0${i + 1}</span>
      <h3>${f.t}</h3>
      <p>${f.d}</p>
    </div>
  `).join('');

  // New arrivals
  document.getElementById('newGrid').innerHTML = data.newArrivals.map((p, i) => `
    <div class="product">
      <div class="img-wrap">
        <img loading="lazy" src="${p.img}" alt="${p.name}"/>
        <button class="quick-view" data-idx="${i}">Quick View</button>
      </div>
      <div class="product-meta"><h3>${p.name}</h3><span>${p.price}</span></div>
    </div>
  `).join('');

  // Testimonials
  document.getElementById('tGrid').innerHTML = data.testimonials.map(t => `
    <figure class="t-card">
      <div class="stars">★★★★★</div>
      <blockquote>"${t.q}"</blockquote>
      <figcaption>— ${t.a}</figcaption>
    </figure>
  `).join('');

  // Footer
  document.getElementById('footGrid').innerHTML = `
    <div>
      <div class="logo" style="font-size:1.5rem;letter-spacing:.3em;color:var(--maroon-deep)">ODHANI</div>
      <p>Contemporary Indian ethnic wear, woven with heritage and modern grace.</p>
    </div>
    ${data.footerColumns.map(col => `
      <div>
        <h4>${col.h}</h4>
        <ul>${col.l.map(item => {
          const label = typeof item === 'string' ? item : item.name;
          const href = typeof item === 'string' ? '#' : item.url;
          const attrs = typeof item === 'string' ? '' : ' target="_blank" rel="noopener noreferrer"';
          return `<li><a href="${href}"${attrs}>${label}</a></li>`;
        }).join('')}</ul>
      </div>`).join('')}
  `;
  document.getElementById('copyright').textContent = data.brand.footer;

  // Quick View modal
  const modalRoot = document.getElementById('modalRoot');
  document.querySelectorAll('.quick-view').forEach(btn => {
    btn.addEventListener('click', () => openModal(data.newArrivals[+btn.dataset.idx]));
  });

  function openModal(p) {
    let size = p.sizes[0], color = p.colors[0].name;
    document.body.style.overflow = 'hidden';
    const render = () => {
      modalRoot.innerHTML = `
        <div class="modal-backdrop" id="mb">
          <div class="modal" id="mc">
            <button class="modal-close" id="mx" aria-label="Close">✕</button>
            <div class="modal-img"><img src="${p.img}" alt="${p.name}"/></div>
            <div class="modal-body">
              <div>
                <span class="eyebrow">New Arrival</span>
                <h3>${p.name}</h3>
                <p class="modal-price">${p.price}</p>
              </div>
              <p class="modal-desc">${p.desc}</p>
              <div>
                <div class="opt-head"><span>Color</span><span>${color}</span></div>
                <div class="swatches">
                  ${p.colors.map(c => `<button class="swatch ${c.name === color ? 'active' : ''}" data-c="${c.name}" style="background:${c.hex}" aria-label="${c.name}"></button>`).join('')}
                </div>
              </div>
              <div>
                <div class="opt-head"><span>Size</span><a href="#" style="text-transform:none;letter-spacing:normal">Size guide</a></div>
                <div class="sizes">
                  ${p.sizes.map(s => `<button class="size-chip ${s === size ? 'active' : ''}" data-s="${s}">${s}</button>`).join('')}
                </div>
              </div>
              <div class="modal-actions">
                <button class="btn-cart" id="addCart">Add to Cart</button>
                <button class="btn-wish">Add to Wishlist</button>
              </div>
            </div>
          </div>
        </div>`;
      modalRoot.querySelector('#mb').addEventListener('click', close);
      modalRoot.querySelector('#mc').addEventListener('click', e => e.stopPropagation());
      modalRoot.querySelector('#mx').addEventListener('click', close);
      modalRoot.querySelectorAll('.swatch').forEach(b => b.addEventListener('click', () => { color = b.dataset.c; render(); }));
      modalRoot.querySelectorAll('.size-chip').forEach(b => b.addEventListener('click', () => { size = b.dataset.s; render(); }));
      modalRoot.querySelector('#addCart').addEventListener('click', e => {
        e.target.textContent = 'Added to Cart ✓';
        setTimeout(() => { if (e.target) e.target.textContent = 'Add to Cart'; }, 2000);
      });
    };
    render();
    const onKey = e => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    function close() {
      modalRoot.innerHTML = '';
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    }
  }
})();
