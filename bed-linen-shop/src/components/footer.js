export function createFooter() {
  const footer = document.createElement('footer');
  footer.innerHTML = `
    <div class="image-wrapper"></div>
    <div class="container animate-on-scroll">
      <div class="column">
        <h3>About</h3>
        <ul>
          <li><a href="#">Our Story</a></li>
          <li><a href="#">Our Impact</a></li>
          <li><a href="#">FAQ</a></li>
        </ul>
      </div>

      <div class="column">
        <h3>Customer Resources</h3>
        <ul>
          <li><a href="#">E-Catalog</a></li>
          <li><a href="#">Request Catalog</a></li>
          <li><a href="#">Support</a></li>
        </ul>
      </div>

      <div class="column">
        <h3>Services</h3>
        <ul>
          <li><a href="#">Delivery & Shipping</a></li>
          <li><a href="#">Returns</a></li>
          <li><a href="#">Guarantee</a></li>
        </ul>
      </div>

      <div class="column">
        <h3>Contact</h3>
        <ul>
          <li>
            <img src="/assets/footer/geo-icon.svg" alt="Location icon" />
            12 Jhon Avenue #2, New York
          </li>
          <li>
            <img src="/assets/footer/email-icon.svg" alt="Email icon" />
            <a href="mailto:sleepy@shop.com">Sleepy@Shop.com</a>
          </li>
          <li>
            <img src="/assets/footer/smartphone-icon.svg" alt="Phone icon" />
            <a href="tel:+122234SLEEP">+1-222-34-SLEEP</a>
          </li>
        </ul>

        <div class="social">
          <p>social media:</p>
          <a href="#"><img src="/assets/footer/linkedin-icon.svg" alt="LinkedIn" /></a>
          <a href="#"><img src="/assets/footer/pinterest-icon.svg" alt="Pinterest" /></a>
          <a href="#"><img src="/assets/footer/instagram-icon.svg" alt="Instagram" /></a>
        </div>
      </div>
    </div>

    <div class="bottom animate-on-scroll">
      <p>Created by Heorhii</p>
      <p>Copyright 2023 Sleepy Shop. All Rights Reserved.</p>
    </div>
  `;
  return footer;
}
