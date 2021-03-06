import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './header.css';
import { MovieCtx } from '../../utils/Contexts/MoiveCtx';
import { VscSearch } from 'react-icons/vsc'
import DropDown from '../dropdown/DropDown';
import useWindow from '../../utils/customHooks/useWindow';

const Header = () => {
	const { data } = React.useContext(MovieCtx);
	const [ input, setInput ] = React.useState('');
	const [ searchValue, setSearchValue ] = React.useState([]);
	const [ menuBar, setMenubar ] = React.useState(false);
	const navigate = useNavigate();
	const window = useWindow();
	const selectClass = window.width === 750 ? 'setBlock' : 'setAbsolute';
	
	const closeMenu = () => setMenubar(false);
	const handleOnChange = (e) => {
		setInput(e.target.value);
		let	SV = data?.filter((movie) => movie.name.replace(/ /g, '').toLowerCase().includes(input.replace(/ /g, '').toLowerCase()));
		setSearchValue(SV);
	};

	return (
		<header className="header_container">
			<div className="header_logo">
				<h1 
					onClick={() => navigate('/')}
				>
					MOVIES
				</h1>

				{/* Mobile only */}
				<button 
					className='burger-menu' 
					onClick={() => setMenubar(prev => !prev)} 
				>
					{!menuBar ? '|||' : 'X'}
				</button>
			</div>

			<ul className={`header_list ${menuBar ? 'isOpen' : ''}`}>
				<li>
					<NavLink to="/" onClick={closeMenu} >Home</NavLink>
				</li>
				<li>
					<DropDown text='TvShows' getClass={selectClass} />
				</li>
				<li>
					<DropDown text="Movies" getClass={selectClass} />
				</li>
				<li>
					<NavLink to="/favorites" onClick={closeMenu}>My List</NavLink>
				</li>
			</ul>

			<div className="header_input">
				<div className="header_search" >
					<input type="text" placeholder="search" onChange={handleOnChange} value={input} />
					{
						input && 
							<ul className="dropdown" >
								{searchValue.length > 0  ? searchValue.map(movie => {
									return (
										<li className="dropdown_menu" >
											<p>{movie.name}</p>						
										</li>
									)
								}) : <p className="no__result" >No results</p>
								}
							</ul>
					}
				</div>
				<button><VscSearch /></button>
			</div>
		</header>
	);
};

export default Header;
