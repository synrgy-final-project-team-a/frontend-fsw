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
						<Card.Text className="fw-bolder fs-6">"Saya sudah menggunakan Kosanku, aplikasi ini sangat membantu saya dalam mencari kos ketika saya kuliah. Saya harap kedepannya kosanku bisa menjadi lebih baik"</Card.Text>
						<div className="d-flex justify-content-center align-items-center mb-2">
							<img
								src="testi1.png"
								className="img-fluid rounded-circle"
								alt=""
							/>
							<span className="fw-bold px-2">M. Chaidir</span>
						</div>
						<Card.Text>Mentor di Binar Academy</Card.Text>
					</Card.Body>
				</Card>
				<Card className="testimoni-card bg-outline-primary">
					<Card.Body className="text-center">
						<Card.Text className="fw-bolder fs-6">"Kosanku merupakan aplikasi pencari kos terbaik yang pernah saya gunakan, karena saya sangat dimudahkan dalam mencari kos dengan kualitas yang bagus dan variatif"</Card.Text>
						<div className="d-flex justify-content-center align-items-center mb-2">
							<img
								src="testi2.png"
								className="img-fluid rounded-circle"
								alt=""
							/>
							<span className="fw-bold px-2">Rizky Mochamad Fauzi</span>
						</div>
						<Card.Text>Mahasiswa Institut Teknologi Bandung</Card.Text>
					</Card.Body>
				</Card>
				<Card className="testimoni-card bg-outline-primary">
					<Card.Body className="text-center">
						<Card.Text className="fw-bolder fs-6">"Walau aplikasi ini terbilang masih baru, tapi keseluruhan fitur yang disediakan sangat membantu saya dan mudah digunakan bagi pengguna baru aplikasi ini. Kosanku the best!!!"</Card.Text>
						<div className="d-flex justify-content-center align-items-center mb-2">
							<img
								src="testi3.jpg"
								className="img-fluid rounded-circle"
								alt=""
							/>
							<span className="fw-bold px-2">Ryan Jonatan</span>
						</div>
						<Card.Text>Mahasiswa Universitas Negeri Semarang</Card.Text>
					</Card.Body>
				</Card>
			</OwlCarousel>
		</Container>
	);
};

export default Testimonial;
