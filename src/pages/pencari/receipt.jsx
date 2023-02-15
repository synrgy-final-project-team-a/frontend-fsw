import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useGetOnebyPencariMutation } from "../../store/apis/transaksi";
import { toast, ToastContainer } from "react-toastify";
import { Document, Page, PDFViewer, StyleSheet, Text, View } from "@react-pdf/renderer";

const Receipt = () => {
	const params = useParams()

	const [
		getOneHit,
		{ isLoading: loadingOne, isSuccess: successOne, isError: errorOne, data: dataOne }
	] = useGetOnebyPencariMutation();

	const styles = StyleSheet.create({
		page: {
			padding: "30pt",
			backgroundColor: '#FFFFFF'
		},
		section: {
			fontSize: "15pt"
		},
		row: {
			display: "flex",
			flexDirection: 'row',
		},
		col: {
			flexGrow: 1
		},
		title: {
			fontSize: "20pt",
			padding: "15pt",
			backgroundColor: '#CCCCCC',
		},
		mb1: {
			marginBottom: "5pt"
		},
		mb2: {
			marginBottom: "10pt"
		},
		mb3: {
			marginBottom: "20pt"
		},
		mb4: {
			marginBottom: "40pt"
		}
	});

	const styleContainer = {
		div: {
			position: "absolute",
			left: "0",
			top: "0",
			height: "99%",
			width: "100%"
		},
		viewer: {
			width: "100%",
			height: "100%"
		}
	}

	useEffect(() => {
		getOneHit({ bookingId: params.id })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (loadingOne) {
			toast.loading('Sedang membuat pdf', {
				position: "top-center",
				autoClose: false,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
				theme: "light",
			})
		}

		if (successOne) {
			toast.dismiss()
		}

		if (errorOne) {
			toast.dismiss()
			toast.error("Gagal membuat pdf", {
				position: "top-center",
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
				theme: "light",
			})
			setTimeout(() => {
				window.close();
			}, 1000);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loadingOne])

	return (
		<div style={styleContainer.div}>
			<ToastContainer />
			{
				successOne ?
					<PDFViewer style={styleContainer.viewer}>
						<Document>
							<Page size="A4" style={styles.page}>
								<View style={{...styles.title, ...styles.mb4}}>
									<Text>Receipt KosanKu</Text>
								</View>
								<View style={{...styles.section, ...styles.mb2}}>
									<Text style={styles.mb1}>KosanKu</Text>
									<Text style={styles.mb1}> Klitren, Gondokusuman, Yogyakarta</Text>
									<Text style={styles.mb1}>Daerah Istimewa Yogyakarta.</Text>
									<Text style={styles.mb1}>Telp. +62 897 6767 1212</Text>
									<Text style={styles.mb1}>kosanku@mail.com</Text>
								</View>
								<View style={{...styles.section, ...styles.mb4}}>
									<Text>No. {dataOne.data[0].booking_code}</Text>
								</View>
								<View style={styles.row}>
									<Text>Section #2</Text>
								</View>
							</Page>
						</Document>
					</PDFViewer>
					: ""
			}
		</div>
	)
}

export default Receipt