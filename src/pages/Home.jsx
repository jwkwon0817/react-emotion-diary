import { MyHeader } from '../components/MyHeader';
import { useContext, useEffect, useState } from 'react';
import { MyButton } from '../components/MyButton';
import { DiaryStateContext } from '../App';
import { DiaryList } from '../components/DiaryList';

export const Home = () => {
	const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
	
	const diaryList = useContext(DiaryStateContext);
	
	const [ data, setData ] = useState([]);
	const [ currentDate, setCurrentDate ] = useState(new Date());
	
	const headText = `${ months[currentDate.getMonth()] } ${ currentDate.getFullYear() }`;
	
	useEffect(() => {
		if (diaryList.length >= 1) {
			const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getTime();
			const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59).getTime();
			
			setData(diaryList.filter((item) => firstDay <= item.date && item.date <= lastDay));
		}
	}, [ diaryList, currentDate ]);
	
	const increaseMonth = () => {
		setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()));
	};
	
	const decreaseMonth = () => {
		setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate()));
	};
	
	return (
		<div>
			<MyHeader headText={ headText }
			          leftChild={ <MyButton text={ '<' } onClick={ decreaseMonth } /> }
			          rightChild={ <MyButton text={ '>' } onClick={ increaseMonth } /> } />
			<DiaryList diaryList={ data } />
		</div>
	);
};