import { useState, useEffect, useRef } from 'react';
import Input from './Input';
import DropdownList from './DropdownList';
import './styles.css';

function Dropdown() {
	const timeout = useRef();
	const dropdownRef = useRef();

	const [inputValue, setInputValue] = useState('');
	const [search, setSearch] = useState('');
	const [start, setStart] = useState(0);
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const query = `?search=${search}&start=${start}&offset=10`;
		fetch('http://localhost:5000/' + query)
			.then(res => res.json())
			.then(resData => {
				setData(prev => [...prev, ...resData])
			})
	}, [start, search]);

	useEffect(() => {
		function handleClickOutside(event) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [])

	const handleChangeSearch = (e) => {
		setInputValue(e.target.value);
		if (timeout.current) clearTimeout(timeout.current);
		timeout.current = setTimeout(() => {
			if (data.length) setData([]);
			setStart(0);
			setSearch(e.target.value);
		}, 500);
	}

	const handleSelect = (item) => {
		setIsOpen(false);
		setData([]);
		setInputValue(item.title);
		setSearch(item.title);
	}

	return (
		<div className='dropdown-container'>
			<div className='dropdown' ref={dropdownRef}>
				<input
					onClick={() => setIsOpen(true)}
					onChange={handleChangeSearch}
					value={inputValue}
				/>
				{isOpen && (
					<DropdownList
						isLoading={isLoading}
						data={data}
						handleSelect={handleSelect}
						setStart={setStart}
					/>
				)}
			</div>
			<div>
				<h3>
					This is out of the dropdown
				</h3>
			</div>
		</div>
	)
}

export default Dropdown;
