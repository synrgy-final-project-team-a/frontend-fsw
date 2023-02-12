export const rupiahFormat = (money) => {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR"
	}).format(money);
}

export const durationToDurasi = (type) => {
	switch (type) {
		case "DAILY":
			return "Hari"

		case "WEEKLY":
			return "Minggu"

		case "MONTHLY":
			return "Bulan"

		case "QUARTER":
			return "3 Bulan"

		case "SEMESTER":
			return "6 Bulan"

		case "YEARLY":
			return "Tahun"

		default:
			return ""
	}
}