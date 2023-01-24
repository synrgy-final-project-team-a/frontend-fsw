import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
	const navigate = useNavigate()

	const [searchInput, setSeacrhInput] = useState("");

	const handleButtonCariKos = (e) => {
		console.log(e.target.value);
	}

	const handleChange = (e) => {
		e.preventDefault();
		setSeacrhInput(e.target.value);
	}

	const routeToSearch = (e) => {
		e.preventDefault()
		navigate('/search')
	}

	return (
		<>
			

				<div className="row height d-flex justify-content-center align-items-center">

					<div className="col-md-6">

						<div className="form" onClick={routeToSearch}>
							<i className="fa fa-search"></i>
							<input type="text" className="form-control form-input" placeholder="Search anything..." onChange={handleChange} value={searchInput} />
							<span className="left-pan"><i className="fa fa-microphone"></i></span>
							<button onClick={(e) => handleButtonCariKos(e)}>Cari Kos</button>
						</div>

						<h1>{searchInput}</h1>

					</div>

				</div>

			

			{/* <Container>
              <Row className="height d-flex justify-content-center align-items-center">
                <Col md={6}>
                  <Form>
                    
                  </Form>

                </Col>
              </Row>
            </Container> */}
		</>
	)
}

export default Search;