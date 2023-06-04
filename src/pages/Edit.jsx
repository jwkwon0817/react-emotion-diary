import { useNavigate, useParams } from 'react-router-dom';
import { DiaryStateContext } from '../App';
import { useContext, useEffect, useState } from 'react';
import { DiaryEditor } from '../components/DiaryEditor';

export const Edit = () => {
	const [ originData, setOriginData ] = useState();
	const navigate = useNavigate();
	const { id } = useParams();
	
	const diaryList = useContext(DiaryStateContext);
	
	useEffect(() => {
		const titleElement = document.getElementsByTagName('title')[0];
		titleElement.innerText = `Emotion Diary - Edit Diary [ ${ id } ]`;
	});
	
	useEffect(() => {
		if (diaryList.length >= 1) {
			const targetDiary = diaryList.find((item) => parseInt(item.id) === parseInt(id));
			
			if (targetDiary) {
				setOriginData(targetDiary);
			} else {
				navigate('/', { replace: true });
			}
			
		}
	}, [ id, diaryList ]);
	
	return (
		<div>
			{
				originData && <DiaryEditor isEdit={ true } originData={ originData } />
			}
		</div>
	);
};