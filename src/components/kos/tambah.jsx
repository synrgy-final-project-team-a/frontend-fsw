import { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { emptyKos } from "../../store/slices/kosSlice";
import DataAlamatKos from "./tambah/dataAlamatKos";
import DataFasilitasKos from "./tambah/dataFasilitasKos";
import DataHargaKos from "./tambah/dataHargaKos";
import DataKamarKos from "./tambah/dataKamarKos";
import DataKos from "./tambah/dataKos";
import DataPeraturanKos from "./tambah/dataPeraturanKos";
import PreviewKos from "./tambah/previewKos";

const TambahKosIndex = () => {
  const dispatch = useDispatch()

  const [key, setKey] = useState(1);

  const kos = useSelector((state) => state.kos);

  useEffect(() => {
    if (kos.submitted === true) {
      dispatch(emptyKos())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kos.submitted])

  return (
    <div id="tambah-kos">
      <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
        transition={false}
        justify
      >
        <Tab eventKey="1" title="1" disabled tabClassName={kos.progress < 1 ? "disabled-tab" : ""}>
          <DataKos setKeynya={setKey} />
        </Tab>
        <Tab eventKey="2" title="2" disabled tabClassName={kos.progress < 2 ? "disabled-tab" : ""}>
          <DataAlamatKos setKeynya={setKey} />
        </Tab>
        <Tab eventKey="3" title="3" disabled tabClassName={kos.progress < 3 ? "disabled-tab" : ""}>
          <DataPeraturanKos setKeynya={setKey} />
        </Tab>
        <Tab eventKey="4" title="4" disabled tabClassName={kos.progress < 4 ? "disabled-tab" : ""}>
          <DataFasilitasKos setKeynya={setKey} />
        </Tab>
        <Tab eventKey="5" title="5" disabled tabClassName={kos.progress < 5 ? "disabled-tab" : ""}>
          <DataKamarKos setKeynya={setKey} />
        </Tab>
        <Tab eventKey="6" title="6" disabled tabClassName={kos.progress < 6 ? "disabled-tab" : ""}>
          <DataHargaKos setKeynya={setKey} />
        </Tab>
        <Tab eventKey="7" title="7" disabled tabClassName={kos.progress < 7 ? "disabled-tab" : ""}>
          <PreviewKos setKeynya={setKey} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default TambahKosIndex;
