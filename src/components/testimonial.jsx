import { Card, Container } from "react-bootstrap";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const Testimonial = () => {

	const responsiveItems = {
		0: {
			items: 1
		},
		992: {
			items: 3
		}
	}
	return (
		<Container className="mb-5" id="testimoni">
			<h2 className="mb-3">Kata Mereka</h2>
			<OwlCarousel className="owl-theme" autoplay={true} responsive={responsiveItems} loop dots={false} margin={20} >
				<Card className="testimoni-card bg-outline-primary">
					<Card.Body className="text-center">
						<Card.Text className="fw-bolder fs-6">"Kosanku merupakan aplikasi pencari kos terbaik yang pernah saya gunakan, karena saya sangat dimudahkan dalam mencari kos dengan kualitas yang bagus"</Card.Text>
						<div className="d-flex justify-content-center align-items-center mb-2">
							<img
								src="https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg"
								className="img-fluid rounded-circle"
								alt=""
							/>
							<span className="fw-bold px-2">Andini Suryaningrum</span>
						</div>
						<Card.Text>Mahasiswa Universitas Negeri Semarang</Card.Text>
					</Card.Body>
				</Card>
				<Card className="testimoni-card bg-outline-primary">
					<Card.Body className="text-center">
						<Card.Text className="fw-bolder fs-6">"Kosanku merupakan aplikasi pencari kos terbaik yang pernah saya gunakan, karena saya sangat dimudahkan dalam mencari kos dengan kualitas yang bagus"</Card.Text>
						<div className="d-flex justify-content-center align-items-center mb-2">
							<img
								src="https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg"
								className="img-fluid rounded-circle"
								alt=""
							/>
							<span className="fw-bold px-2">Andini Suryaningrum</span>
						</div>
						<Card.Text>Mahasiswa Universitas Negeri Semarang</Card.Text>
					</Card.Body>
				</Card>
				<Card className="testimoni-card bg-outline-primary">
					<Card.Body className="text-center">
						<Card.Text className="fw-bolder fs-6">"Kosanku merupakan aplikasi pencari kos terbaik yang pernah saya gunakan, karena saya sangat dimudahkan dalam mencari kos dengan kualitas yang bagus"</Card.Text>
						<div className="d-flex justify-content-center align-items-center mb-2">
							<img
								src="https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg"
								className="img-fluid rounded-circle"
								alt=""
							/>
							<span className="fw-bold px-2">Andini Suryaningrum</span>
						</div>
						<Card.Text>Mahasiswa Universitas Negeri Semarang</Card.Text>
					</Card.Body>
				</Card>
			</OwlCarousel>
		</Container>
	);
};

export default Testimonial;
