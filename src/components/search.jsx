import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchIsBottom, searchIsTop } from "../store/slices/decorSlice";

const SearchComponent = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const searchRef = useRef()

	const routeToSearch = (e) => {
		e.preventDefault();
		navigate("/pencarian");
	};

	useEffect(() => {
		const handleScroll = () => {
			if (searchRef) {
				const top = searchRef.current.getBoundingClientRect().top
				if (top < 0) {
					dispatch(searchIsTop())
				} else {
					dispatch(searchIsBottom())
				}
			}
			return
		}

		window.addEventListener("scroll", handleScroll);

		return function cleanup() {
			dispatch(searchIsBottom())
			window.removeEventListener("scroll", handleScroll);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<div className="d-flex justify-content-center" ref={searchRef}>
				<div className="form-search d-flex w-75" onClick={routeToSearch}>
					<img src="/search-normal.svg" alt="..." className="p-2" />
					<img src="/line-vertical.svg" alt="..." />
					<input type="text" className="w-100 border-0 mx-2" placeholder="Tulis daerah / alamat kosan yang akan kamu tuju" />
					<button className="btn btn-primary m-1 rounded-full">
						Cari
					</button>
				</div>
			</div>
		</>
	);
};

export default SearchComponent;
