const Footer = () => {
    return (
        <section className="footer mt-4 mx-auto max-w-6xl px-2 sm:px-6 lg:px-">
        <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 ...">
            <div className="col-span-1 ...">
              <img src="../assets/logo.svg" alt=""/>
              <h6 className="mt-4">Gali Potensi Anda Melalui Pembelajaran Video di hariesok.id!</h6>
              <p className="mt-2">Jl. Usman Effendi No. 50 Lowokwaru, Malang</p>
              <p className="mt-2">+62-877-7123-1234</p>
            </div>
            <div className="col-span-1 ...">
              <div className="display-web grid grid-cols-1 md:grid-cols-3 ...">
                <div className="col-sm-4">
                  <p><b>Kategori</b></p>
                  <p className="mt-3"><a href="">Digital & Teknologi</a></p>
                  <p className="mt-1"><a href="">Pemasaran</a></p>
                  <p className="mt-1"><a href="">Manajemen Bisnis</a></p>
                  <p className="mt-1"><a href="">Pengembangan Diri</a></p>
                  <p className="mt-1"><a href="">Desain</a></p>
                </div>
                <div className="col-sm-4">
                  <p><b>Perusahaan</b></p>
                  <p className="mt-3"><a href="">Tentang Kami</a></p>
                  <p className="mt-1"><a href="">FAQ</a></p>
                  <p className="mt-1"><a href="">Kebijakan Privasi</a></p>
                  <p className="mt-1"><a href="">Ketentuan Layanan</a></p>
                  <p className="mt-1"><a href="">Bantuan</a></p>
                </div>
                <div className="col-sm-4">
                  <p><b>Komunitas</b></p>
                  <p className="mt-3"><a href="">Tips Sukses</a></p>
                  <p className="mt-1"><a href="">Blog</a></p>
                </div>
              </div>
              <div className="display-mobile">
              <div className="mt-2 pt-4 md:hidden">
          <details className="mb-2 group transition-all duration-300">
            <summary className="cursor-pointer font-semibold text-sm flex justify-between items-center">
              Kategori
              <span className="ml-2 transition-transform duration-300 group-open:rotate-180">⌄</span>
            </summary>
            <ul className="mt-2 ml-4 text-sm text-gray-700 space-y-1 overflow-hidden transition-all duration-300">
              <li>Digital & Teknologi</li>
              <li>Pemasaran</li>
              <li>Manajemen Bisnis</li>
              <li>Pengembangan Diri</li>
              <li>Desain</li>
            </ul>
          </details>

          <details className="mb-2 group transition-all duration-300">
            <summary className="cursor-pointer font-semibold text-sm flex justify-between items-center">
              Perusahaan
              <span className="ml-2 transition-transform duration-300 group-open:rotate-180">⌄</span>
            </summary>
            <ul className="mt-2 ml-4 text-sm text-gray-700 space-y-1">
              <li>Tentang Kami</li>
              <li>FAQ</li>
              <li>Kebijakan Privasi</li>
              <li>Ketentuan Layanan</li>
              <li>Bantuan</li>
            </ul>
          </details>

          <details className="mb-2 group transition-all duration-300">
            <summary className="cursor-pointer font-semibold text-sm flex justify-between items-center">
              Komunitas
              <span className="ml-2 transition-transform duration-300 group-open:rotate-180">⌄</span>
            </summary>
            <ul className="mt-2 ml-4 text-sm text-gray-700 space-y-1">
              <li>Tips Sukses</li>
              <li>Blog</li>
            </ul>
          </details>
        </div>

        {/* Footer bottom */}
        <div className="flex justify-center gap-4 mt-3">
          <i className="fab fa-linkedin-in" />
          <i className="fab fa-facebook-f" />
          <i className="fab fa-instagram" />
          <i className="fab fa-twitter" />
        </div>
              </div>
            </div>
          </div>
          <hr className="my-4" />
          <div className="foot-credit grid grid-cols-1 md:grid-cols-2 ... flex flex-col md:flex-row justify-between">
            <div className="mt-sm-0 mt-3">
              <p className="text-secondary">@2023 Gerobak Sayur All Rights Reserved.</p>
            </div>
            <div className="content-end">
              <ul className="social-media flex space-x-4 mt-2 md:mt-0 sm:justify-start md:justify-end">
                <li className="inline"><a href=""><img src="assets/linkedin.svg" alt=""/></a></li>
                <li className="inline"><a href=""><img src="assets/facebook.svg" alt=""/></a></li>
                <li className="inline"><a href=""><img src="assets/instagram.svg" alt=""/></a></li>
                <li className="inline"><a href=""><img src="assets/twitter.svg" alt=""/></a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    )
}

export default Footer