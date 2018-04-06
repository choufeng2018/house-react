import React from 'react';

export const Main = ({children}) => {
	return (
		<div style={{
			// overflow: 'hidden'
		}}>
			<div style={{
				// overflow: 'hidden',
			}}>
				{children}
			</div>
		</div>
	);
};

Main.propTypes = {};
Main.defaultProps = {};
export default Main;
