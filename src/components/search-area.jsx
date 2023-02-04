const AreaComponent = () => {
  return (
    <div className="container w-50">
      <p className="text-neutral">Pilih salah satu area di bawah ini </p>
      <div>
        <p className="fw-semibold text-neutral fs-4">Area</p>
        <div className="d-flex gap-2 h-2">
          <div className="rounded-2 border border-3 border-primary-light ">
            <img src="/location2.svg" alt="..." className="py-3 px-4" />
          </div>
          <div className="rounded-2     w-100 border border-3 border-primary-light">
            <p className="text-neutral px-2 py-1">
              Semarang <br /> Kota Semarang, Jawa Tengah, Indonesia{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <p className="fw-semibold text-neutral fs-4">Nama Kos</p>
        <div className="d-flex gap-2 h-2">
          <div className="rounded-2 border border-3 border-primary-light ">
            <img src="/house.svg" alt="..." className="py-3 px-4" />
          </div>
          <div className="rounded-2 w-100 border border-3 border-primary-light">
            <p className="text-neutral px-2 py-3">Kost Kauman Semarang Murah</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreaComponent;
