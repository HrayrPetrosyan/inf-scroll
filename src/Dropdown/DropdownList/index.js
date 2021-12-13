import { useRef } from 'react';
import './styles.css';

function DropdownList({ isLoading, data, setStart, handleSelect }) {
	const timeout = useRef();

  const handleScroll = (e) => {
		if (isLoading) return;
    const { scrollHeight, scrollTop, clientHeight } = e.target;
    const bottomHit = scrollHeight - scrollTop <= clientHeight;
    
		if (bottomHit) {
			if (timeout.current) clearTimeout(timeout.current);
			timeout.current = setTimeout(() => {
				setStart(start => start + 10);
			}, 1000);
		}
  }

	return (
		<div className='dropdown-list' onScroll={handleScroll}>
			{isLoading ? <div>Loading...</div> : data.map(item => (
				<div className='dropdown-list-item' key={item.id} onClick={() => handleSelect(item)}>
					{item.title}
				</div>
			))}
		</div>
	)
}

export default DropdownList;
