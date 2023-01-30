import PencarianLayout from "../../layouts/pencarian.layout";

const Pencarian = () => {
  return (
    <PencarianLayout>
      <div className="mx-auto w-50 mt-5">
        <button className="btn-location d-flex pt-1 justify-content-center gap-3">
          Cari Kosan Terdekat
          <img src="/location.svg" alt="..." className="mt-1" />
        </button>

        <p className="mt-5 text-neutral fw-semibold">Pencarian Populer</p>

        <div className="row row-cols-5 text-neutral gap-3 mx-1">
          <div class="btn-search-popular text-center pt-1 col cursor-pointer">Jakarta</div>
          <div class="btn-search-popular text-center pt-1 col cursor-pointer">Bandung</div>
          <div class="btn-search-popular text-center pt-1 col cursor-pointer">Malang</div>
          <div class="btn-search-popular text-center pt-1 col cursor-pointer">Semarang</div>
          <div class="btn-search-popular text-center pt-1 col cursor-pointer">Magelang</div>
          <div class="btn-search-popular text-center pt-1 col cursor-pointer">Kudus</div>
          <div class="btn-search-popular text-center pt-1 col cursor-pointer">Pati</div>
          <div class="btn-search-popular text-center pt-1 col cursor-pointer">Yogyakarta</div>
          <div class="btn-search-popular text-center pt-1 col cursor-pointer">Depok</div>
          <div class="btn-search-popular text-center pt-1 col cursor-pointer">Bogor</div>
        </div>
      </div>
    </PencarianLayout>
  );
};

export default Pencarian;
