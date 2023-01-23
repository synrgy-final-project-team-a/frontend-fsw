import { Card } from "react-bootstrap";

const Testimonial = () => {
	return (
		<div className="container my-4 d-flex justify-content-center">
			<div className="row">
				<div className="col text-center">
					<Card style={{ width: "18rem" }} className="shadow">
						<div className="text-center">
							<Card.Img variant="top" src="https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg" className="img-fluid w-50 rounded-circle" />
						</div>
						<Card.Body>
							<Card.Title>Card Title</Card.Title>
							<Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
						</Card.Body>
					</Card>
				</div>
				<div className="col text-center">
					<Card style={{ width: "18rem" }} className="shadow">
						<div className="text-center">
							<Card.Img variant="top" src="https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg" className="img-fluid w-50 rounded-circle" />
						</div>
						<Card.Body>
							<Card.Title>Card Title</Card.Title>
							<Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
						</Card.Body>
					</Card>
				</div>
				<div className="col text-center">
					<Card style={{ width: "18rem" }} className="shadow">
						<div className="text-center">
							<Card.Img variant="top" src="https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg" className="img-fluid w-50 rounded-circle" />
						</div>
						<Card.Body>
							<Card.Title>Card Title</Card.Title>
							<Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
						</Card.Body>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default Testimonial;
