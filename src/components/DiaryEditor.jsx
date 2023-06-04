import { MyHeader } from './MyHeader';
import { MyButton } from './MyButton';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmotionItem } from './EmotionItem';
import { DiaryDispatchContext } from '../App';
import { getStringDate } from '../utils/date';
import { emotionList } from '../utils/emotionList';

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || '';

export const DiaryEditor = ({ isEdit, originData }) => {
	const contentRef = useRef();
	
	const [ content, setContent ] = useState('');
	const [ emotion, setEmotion ] = useState(3);
	const [ date, setDate ] = useState(getStringDate(new Date()));
	
	const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);
	
	const handleClickEmote = useCallback((emotion) => {
		setEmotion(emotion);
	}, []);
	
	const handleSubmit = () => {
		if (content.length < 1) {
			contentRef.current.focus();
			return;
		}
		
		if (window.confirm(isEdit ? 'Edit this diary?' : 'Create this diary?')) {
			if (!isEdit) {
				onCreate(date, content, emotion);
			} else {
				onEdit(originData.id, date, content, emotion);
			}
		}
		
		navigate('/', { replace: true });
	};
	
	const handleRemove = () => {
		if (window.confirm('Remove this diary?')) {
			onRemove(originData.id);
			navigate('/', { replace: true });
		}
	};
	
	useEffect(() => {
		if (isEdit) {
			setDate(getStringDate(new Date(parseInt(originData.date))));
			setEmotion(originData.emotion);
			setContent(originData.content);
		}
	}, [ isEdit, originData ]);
	
	const navigate = useNavigate();
	
	return (
		<div className={ 'DiaryEditor' }>
			<MyHeader headText={ isEdit ? 'Edit' : 'New' }
			          leftChild={ <MyButton text={ '< Go Back' } onClick={ () => navigate(-1) } /> }
			          rightChild={ isEdit && (
				          <MyButton text={ 'Remove' } type={ 'negative' } onClick={ handleRemove } />
			          ) } />
			<div>
				<section>
					<h4>When is it today?</h4>
					<div className={ 'input-box' }>
						<input className={ 'input-date' }
						       value={ date }
						       onChange={ (e) => setDate(e.target.value) }
						       type={ 'date' } />
					</div>
				</section>
				<section>
					<h4>Today's Emotion</h4>
					<div className={ 'input-box emotion-list-wrapper' }>
						{
							emotionList.map((item) => {
								return (
									<EmotionItem key={ item.emotionId } { ...item }
									             onClick={ handleClickEmote }
									             isSelected={ item.emotionId === emotion }></EmotionItem>
								);
							})
						}
					</div>
				</section>
				<section>
					<h4>Today's Diary</h4>
					<div className={ 'input-box text-wrapper' }>
						<textarea placeholder={ 'How was your day?' }
						          ref={ contentRef }
						          value={ content }
						          onChange={ (e) => setContent(e.target.value) } />
					</div>
				</section>
				<section>
					<div className={ 'control-box' }>
						<MyButton text={ 'Cancel' } onClick={ () => navigate(-1) } />
						<MyButton text={ 'Save' } type={ 'positive' } onClick={ handleSubmit } />
					</div>
				</section>
			</div>
		</div>
	);
};