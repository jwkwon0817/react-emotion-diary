import { useNavigate, useParams } from 'react-router-dom';
import { DiaryStateContext } from '../App';
import { useContext, useEffect, useState } from 'react';
import { MyHeader } from '../components/MyHeader';
import { getStringDate } from '../utils/date';
import { MyButton } from '../components/MyButton';
import { emotionList } from '../utils/emotionList';

export const Diary = () => {
	const { id } = useParams();
	const diaryList = useContext(DiaryStateContext);
	const navigate = useNavigate();
	const [ data, setData ] = useState();
	
	useEffect(() => {
		const titleElement = document.getElementsByTagName('title')[0];
		titleElement.innerText = `Emotion Diary - Diary [ ${ id } ]`;
	});
	
	useEffect(() => {
		if (diaryList.length >= 1) {
			const targetDiary = diaryList.find((item) => parseInt(item.id) === parseInt(id));
			
			if (targetDiary) {
				setData(targetDiary);
			} else {
				alert('There is no corresponding diary.');
				navigate('/', { replace: true });
			}
			
		}
	}, [ id, diaryList ]);
	
	if (!data) {
		return (
			<div className={ 'DiaryPage' }>Loading...</div>
		);
	} else {
		const currentEmotionData = emotionList.find(
			(item) => parseInt(item.emotionId) === parseInt(data.emotion),
		);
		
		return (
			<div className={ 'DiaryPage' }>
				<MyHeader headText={ `${ getStringDate(new Date(data.date)) } Diary` }
				          leftChild={ <MyButton text={ '< Go Back' } onClick={ () => navigate(-1) } /> }
				          rightChild={ <MyButton text={ 'Edit' } onClick={ () => navigate(`/edit/${ data.id }`) } /> } />
				<article>
					<section>
						<h4>Today's Emotion</h4>
						<div className={ [ 'diary-img-wrapper', `diary-img-wrapper-${ data.emotion }` ].join(' ') }>
							<img src={ currentEmotionData.emotionImg } alt={ currentEmotionData.emotionId } />
							<div className={ 'emotion-description' }>
								{ currentEmotionData.emotionDescription }
							</div>
						</div>
					</section>
					<section>
						<h4>Today's Diary</h4>
						<div className={ 'diary-content-wrapper' }>
							<p>{ data.content }</p>
						</div>
					</section>
				</article>
			</div>
		);
	}
};