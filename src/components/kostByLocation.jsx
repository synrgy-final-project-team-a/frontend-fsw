import Card from "react-bootstrap/Card";

function KostByLocation() {
  return (
    <div className="container">
      <p>Cari Kosan Berdasarkan Lokasi</p>
      <div className="row">
        <div className="col-4">
          <div className="container">
            <div className="row">
              <div className="col">
                <table className="table">
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Bandung</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Bandung</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Bandung</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Bandung</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col">
                <table className="table">
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Bandung</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Bandung</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Bandung</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Bandung</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-2">
          <div className="container">
            <Card>
              <Card.Img variant="top" src="https://png.pngtree.com/png-vector/20191120/ourmid/pngtree-bandung-landmark-icon-west-java-indonesia-png-image_2008327.jpg" />
              <Card.Body>
                <Card.Title className="text-center">KOTA</Card.Title>
              </Card.Body>
            </Card>
          </div>
        </div>
        <div className="col-2">
          <div className="container">
            <Card>
              <Card.Img variant="top" src="https://rekreartive.com/wp-content/uploads/2018/11/Logo-Untan-Universitas-Tanjungpura-PNG.png" />
              <Card.Body>
                <Card.Title className="text-center">KAMPUS</Card.Title>
              </Card.Body>
            </Card>
          </div>
        </div>
        <div className="col-4">
          <div className="container">
            <div className="row">
              <div className="col">
                <table className="table">
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>UI-Depok</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>UI-Depok</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>UI-Depok</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>UI-Depok</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col">
                <table className="table">
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>UI-Depok</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>UI-Depok</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>UI-Depok</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>UI-Depok</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KostByLocation;
