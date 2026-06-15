// Odhani.jsx — standalone React component (React 18+)
// Usage:
//   import Odhani from './Odhani.jsx';
//   import content from './content.json';
//   import './styles.css';
//   <Odhani content={content} />
//
// Place /assets/*.jpg in your public folder (or import each image and inject).

import React, { useEffect, useState } from "react";

export default function Odhani({ content }) {
  const [quickView, setQuickView] = useState(null);
  const d = content;

  return (
    <div id="top">
      {/* NAV */}
      <header className="nav">
        <div className="nav-inner">
          <a href="#top" className="logo">{d.brand.name}</a>
          <ul className="nav-links">
            {d.nav.map(l => (
              <li key={l}><a href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}>{l}</a></li>
            ))}
          </ul>
          <a href="#shop" className="nav-cta">Shop</a>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <img src="assets/hero.jpg" alt="Woman in maroon and gold embroidered saree" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div>
            <span className="hero-tag"><span className="gold-divider" /> Heritage Couture</span>
            <h1>{d.brand.tagline.split(" Into ")[0]}<br/>Into Every Thread</h1>
            <p>{d.brand.description}</p>
            <div className="hero-ctas">
              <a href="#shop" className="btn-primary">Shop Collection</a>
              <a href="#new-in" className="btn-outline">Explore New Arrivals</a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about" id="about">
        <div className="about-grid">
          <div>
            <span className="eyebrow">{d.about.eyebrow}</span>
            <h2 className="display">{d.about.heading}</h2>
          </div>
          <p>{d.about.body}</p>
        </div>
      </section>

      {/* COLLECTIONS */}
      <section className="collections" id="collections">
        <div className="section-head">
          <span className="eyebrow">Featured</span>
          <h2 className="display">Curated Collections</h2>
        </div>
        <div className="coll-grid">
          {d.collections.map(c => (
            <a key={c.title} href="#shop" className="coll-card">
              <div className="img-wrap"><img loading="lazy" src={c.img} alt={c.title} /></div>
              <div className="coll-overlay" />
              <div className="coll-text">
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <span className="more">Explore →</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* WHY */}
      <section className="why">
        <div className="why-head">
          <span className="eyebrow">Why Odhani</span>
          <h2 className="display">Crafted With Purpose</h2>
        </div>
        <div className="why-grid">
          {d.features.map((f, i) => (
            <div className="why-item" key={f.t}>
              <span className="num">0{i + 1}</span>
              <h3>{f.t}</h3>
              <p>{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="new" id="new-in">
        <div className="new-head">
          <div>
            <span className="eyebrow">New Arrivals</span>
            <h2 className="display">Fresh Styles, Timeless Appeal</h2>
          </div>
          <a href="#shop" className="view-all">View All →</a>
        </div>
        <div className="new-grid">
          {d.newArrivals.map(p => (
            <div className="product" key={p.name}>
              <div className="img-wrap">
                <img loading="lazy" src={p.img} alt={p.name} />
                <button className="quick-view" onClick={() => setQuickView(p)}>Quick View</button>
              </div>
              <div className="product-meta">
                <h3>{p.name}</h3>
                <span>{p.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <span className="eyebrow">Testimonials</span>
        <h2>Loved By Women Across India</h2>
        <div className="t-grid">
          {d.testimonials.map(t => (
            <figure className="t-card" key={t.a}>
              <div className="stars">★★★★★</div>
              <blockquote>"{t.q}"</blockquote>
              <figcaption>— {t.a}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter">
        <span className="eyebrow">Newsletter</span>
        <h2 className="display">Join The Odhani Circle</h2>
        <p>Be the first to discover new collections, festive launches, exclusive offers, and styling inspiration.</p>
        <form className="nl-form" onSubmit={e => e.preventDefault()}>
          <input type="email" required placeholder="Your email address" />
          <button type="submit">Subscribe</button>
        </form>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="foot-inner">
          <div className="foot-grid">
            <div>
              <div className="logo" style={{ fontSize: "1.5rem", letterSpacing: ".3em", color: "var(--maroon-deep)" }}>{d.brand.name}</div>
              <p>Contemporary Indian ethnic wear, woven with heritage and modern grace.</p>
            </div>
            {d.footerColumns.map(col => (
              <div key={col.h}>
                <h4>{col.h}</h4>
                <ul>{col.l.map(x => <li key={x}><a href="#">{x}</a></li>)}</ul>
              </div>
            ))}
          </div>
          <div className="copyright">{d.brand.footer}</div>
        </div>
      </footer>

      <QuickView product={quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}

function QuickView({ product, onClose }) {
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setSize(product.sizes[0]);
      setColor(product.colors[0].name);
      setAdded(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [product]);

  useEffect(() => {
    const onKey = e => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!product) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <div className="modal-img"><img src={product.img} alt={product.name} /></div>
        <div className="modal-body">
          <div>
            <span className="eyebrow">New Arrival</span>
            <h3>{product.name}</h3>
            <p className="modal-price">{product.price}</p>
          </div>
          <p className="modal-desc">{product.desc}</p>
          <div>
            <div className="opt-head"><span>Color</span><span>{color}</span></div>
            <div className="swatches">
              {product.colors.map(c => (
                <button key={c.name} className={`swatch ${color === c.name ? "active" : ""}`} style={{ background: c.hex }} aria-label={c.name} onClick={() => setColor(c.name)} />
              ))}
            </div>
          </div>
          <div>
            <div className="opt-head"><span>Size</span><a href="#" style={{ textTransform: "none", letterSpacing: "normal" }}>Size guide</a></div>
            <div className="sizes">
              {product.sizes.map(s => (
                <button key={s} className={`size-chip ${size === s ? "active" : ""}`} onClick={() => setSize(s)}>{s}</button>
              ))}
            </div>
          </div>
          <div className="modal-actions">
            <button className="btn-cart" onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 2000); }}>
              {added ? "Added to Cart ✓" : "Add to Cart"}
            </button>
            <button className="btn-wish">Add to Wishlist</button>
          </div>
        </div>
      </div>
    </div>
  );
}
