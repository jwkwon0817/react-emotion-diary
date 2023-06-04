import { MyButton } from './MyButton';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export const DiaryItem = React.memo(({ id, emotion, content, date }) => {
	const navigate = useNavigate();
	
	const env = process.env;
	env.PUBLIC_URL = env.PUBLIC_URL || '';
	
	const strDate = new Date(date).toLocaleDateString();
	
	const goDetail = () => {
		navigate(`/diary/${ id }`);
	};
	
	const goEdit = () => {
		navigate(`/edit/${ id }`);
	};
	
	return (
		<div className={ 'DiaryItem' }>
			<div onClick={ goDetail } className={ [ 'emotion-img-wrapper', `emotion-img-wrapper-${ emotion }` ].join(' ') }>
				<img src={ process.env.PUBLIC_URL + `assets/emotion${ emotion }.png` } alt={ `emotion${ emotion }` } />
			</div>
			<div onClick={ goDetail } className={ 'info-wrapper' }>
				<div className={ 'diary-date' }>{ strDate }</div>
				<div className={ 'diary-content-preview' }>{ content.slice(0, 25) }</div>
			</div>
			<div className={ 'btn-wrapper' }>
				<MyButton text={ 'Edit' } onClick={ goEdit } />
			</div>
		</div>
	);
});