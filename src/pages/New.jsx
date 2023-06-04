import { DiaryEditor } from '../components/DiaryEditor';
import { useEffect } from 'react';

export const New = () => {
	useEffect(() => {
		const titleElement = document.getElementsByTagName('title')[0];
		titleElement.innerText = 'Emotion Diary - New Diary';
	});
	
	return (
		<div>
			<DiaryEditor />
		</div>
	);
};