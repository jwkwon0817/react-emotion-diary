import React from 'react';

export const EmotionItem = React.memo(({ emotionId, emotionImg, emotionDescription, onClick, isSelected }) => {
	return (
		<div onClick={ () => onClick(emotionId) }
		     className={ [ 'EmotionItem', isSelected ? `EmotionItem-on-${ emotionId }` : `EmotionItem-off` ].join(' ') }>
			<img src={ emotionImg } alt={ 'emotion' } />
			<span>{ emotionDescription }</span>
		</div>
	);
});