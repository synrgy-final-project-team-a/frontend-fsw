import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchComponent = () => {
  const navigate = useNavigate();

  const [searchInput, setSeacrhInput] = useState("");

  const handleButtonCariKos = (e) => {
    console.log(e.target.value);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSeacrhInput(e.target.value);
  };

  const routeToSearch = (e) => {
    e.preventDefault();
    navigate("/pencarian");
  };

  return (
    <>
      <div className="d-flex align-items-center">
        <div className="d-flex w-100 col-md-6">
          {/* <div className="form d-flex" onClick={routeToSearch}> */}
          <div
            className="form-search d-flex justify-content-between"
            onClick={routeToSearch}
          >
            {/* <i className="fa fa-search"></i> */}
            {/* <input type="text" className="form-control form-input" placeholder="Search anything..." onChange={handleChange} value={searchInput} /> */}
            <img src="/search-normal.svg" alt="..." className="p-2" />
            <img src="/line-vertical.svg" alt="..." />
            <input
              type="text"
              className="w-100 border-0 mx-2"
              placeholder="Tulis daerah / alamat kosan yang akan kamu tuju  "
              onChange={handleChange}
              value={searchInput}
            />
            <button
              className="btn btn-primary m-1 rounded-full"
              onClick={(e) => handleButtonCariKos(e)}
            >
              Cari
            </button>
          </div>

        </div>
      </div>
          {/* <h1>{searchInput}</h1> */}

      {/* <Container>
              <Row className="height d-flex justify-content-center align-items-center">
                <Col md={6}>
                  <Form>
                    
                  </Form>

                </Col>
              </Row>
            </Container> */}
    </>
  );
};

export default SearchComponent;
