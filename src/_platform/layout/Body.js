import React from 'react';

export const Body = ({children}) => {
	return (
		<div style={{overflow: 'hidden', backgroundColor: '#fff'}}>
			{children}
		</div>
	);
};

Body.propTypes = {};
Body.defaultProps = {};

export default Body;
