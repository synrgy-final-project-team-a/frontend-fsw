import { useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setProgress, submitForm } from "../../../store/slices/kosSlice";

const DataHargaKos = ({ setKeynya }) => {
	const dispatch = useDispatch();

	const price = useSelector((state) => state.kos.harga);
	const kos = useSelector((state) => state.kos);

	const [error, setError] = useState({});
	const checkRef = useRef({});
	const inputRef = useRef({});

	const handleSebelumnya = (e) => {
		e.preventDefault();
		let newKey = 5;
		setKeynya(newKey);
	};

	const handleSetelahnya = (e) => {
		e.preventDefault();

		setError({});
		let failed = false;

		const checkHarga1 = checkRef.current[0].checked;
		const checkHarga2 = checkRef.current[1].checked;
		const checkHarga3 = checkRef.current[2].checked;
		const checkHarga4 = checkRef.current[3].checked;
		const checkHarga5 = checkRef.current[4].checked;
		const checkHarga6 = checkRef.current[5].checked;

		const inputHarga1 = inputRef.current[0].value;
		const inputHarga2 = inputRef.current[1].value;
		const inputHarga3 = inputRef.current[2].value;
		const inputHarga4 = inputRef.current[3].value;
		const inputHarga5 = inputRef.current[4].value;
		const inputHarga6 = inputRef.current[5].value;

		if (checkHarga1) {
			if (inputHarga1 === "") {
				failed = true;
				setError((error) => ({
					...error,
					harian: "Harga harian tidak boleh kosong!",
				}));
			} else {
				if (!/[0-9]/i.test(inputHarga1)) {
					failed = true;
					setError((error) => ({
						...error,
						harian: "Harga harian harus angka!",
					}));
				}
			}
		}

		if (checkHarga2) {
			if (inputHarga2 === "") {
				failed = true;
				setError((error) => ({
					...error,
					mingguan: "Harga mingguan tidak boleh kosong!",
				}));
			} else {
				if (!/[0-9]/i.test(inputHarga2)) {
					failed = true;
					setError((error) => ({
						...error,
						mingguan: "Harga mingguan harus angka!",
					}));
				}
			}
		}

		if (checkHarga3) {
			if (inputHarga3 === "") {
				failed = true;
				setError((error) => ({
					...error,
					bulanan: "Harga bulanan tidak boleh kosong!",
				}));
			} else {
				if (!/[0-9]/i.test(inputHarga3)) {
					failed = true;
					setError((error) => ({
						...error,
						bulanan: "Harga bulanan harus angka!",
					}));
				}
			}
		}

		if (checkHarga4) {
			if (inputHarga4 === "") {
				failed = true;
				setError((error) => ({
					...error,
					"3 bulanan": "Harga 3 bulanan tidak boleh kosong!",
				}));
			} else {
				if (!/[0-9]/i.test(inputHarga4)) {
					failed = true;
					setError((error) => ({
						...error,
						"3 bulanan": "Harga 3 bulanan harus angka!",
					}));
				}
			}
		}

		if (checkHarga5) {
			if (inputHarga5 === "") {
				failed = true;
				setError((error) => ({
					...error,
					"6 bulanan": "Harga 6 bulanan tidak boleh kosong!",
				}));
			} else {
				if (!/[0-9]/i.test(inputHarga5)) {
					failed = true;
					setError((error) => ({
						...error,
						"6 bulanan": "Harga 6 bulanan harus angka!",
					}));
				}
			}
		}

		if (checkHarga6) {
			if (inputHarga6 === "") {
				failed = true;
				setError((error) => ({
					...error,
					tahunan: "Harga tahunan tidak boleh kosong!",
				}));
			} else {
				if (!/[0-9]/i.test(inputHarga6)) {
					failed = true;
					setError((error) => ({
						...error,
						tahunan: "Harga tahunan harus angka!",
					}));
				}
			}
		}

		if (failed) {
			return;
		}

		const payload = {
			harian: 0,
			mingguan: 0,
			bulanan: 0,
			"3 bulanan": 0,
			"6 bulanan": 0,
			tahunan: 0
		};

		if (checkHarga1) {
			payload.harian = inputHarga1
		}

		if (checkHarga2) {
			payload.mingguan = inputHarga2
		}

		if (checkHarga3) {
			payload.bulanan = inputHarga3
		}

		if (checkHarga4) {
			payload["3 bulanan"] = inputHarga4
		}

		if (checkHarga5) {
			payload["6 bulanan"] = inputHarga5
		}

		if (checkHarga6) {
			payload.tahunan = inputHarga6
		}

		const lala = {
			harga: payload
		}

		dispatch(submitForm(lala));
		let newKey = 7;
		if (kos.progress < 7) {
			dispatch(setProgress(7));
		}
		setKeynya(newKey);
	};

	return (
		<>
			<h1 className="text-center">Harga Kos</h1>
			<h3 className="text-center">Masukan harga kamar kosanmu</h3>
			<Form onSubmit={handleSetelahnya}>
				<Row className="g-2 justify-content-center">
					<Col xs={12} lg={6}>
						<Form.Group className="mb-3" controlId="formBasicCheckbox">
							{Object.keys(price).map((el, i) => {
								return (
									<div className="d-flex mb-3 w-100" key={i}>
										<Form.Check
											className="w-25"
											type="checkbox"
											label={el}
											defaultChecked={Object.values(price)[i]}
											ref={(ref) => (checkRef.current[i] = ref)}
										/>
										<div>
											<Form.Control
												type="text"
												placeholder={el}
												ref={(ref) => (inputRef.current[i] = ref)}
												defaultValue={price[el]}
											/>
											{error.hasOwnProperty(el) && error[el] !== "" ? (
												<Form.Text className="text-danger">{error[el]}</Form.Text>
											) : (
												""
											)}
										</div>
									</div>
								);
							})}
						</Form.Group>
					</Col>
					<div className="w-100"></div>
					<Col xs={12} lg={6} className="d-flex">
						<Button
							variant="outline-warning"
							className="w-100 me-1"
							onClick={handleSebelumnya}
						>
							Sebelumnya
						</Button>
						<Button
							variant="outline-primary"
							className="w-100 ms-1"
							type="submit"
						>
							Selanjutnya
						</Button>
					</Col>
				</Row>
			</Form>
		</>
	)
}

export default DataHargaKos